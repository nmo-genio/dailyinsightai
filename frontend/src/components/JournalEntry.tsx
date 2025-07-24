import React, { useState } from 'react';
import axios from 'axios';

interface JournalEntryProps {}

const JournalEntry: React.FC<JournalEntryProps> = () => {
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [insight, setInsight] = useState('');
  const [entryId, setEntryId] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async () => {
    if (!content.trim()) {
      setMessage('Please enter journal content');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:8000/api/journal/entry', {
        content,
        tags: tags.split(',').map(tag => tag.trim()).filter(tag => tag)
      });
      
      if (response.data.success) {
        setEntryId(response.data.entry_id);
        setMessage('Journal entry saved successfully!');
        setContent('');
        setTags('');
      }
    } catch (error) {
      setMessage('Error saving journal entry');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleFileUpload = async () => {
    if (!file) {
      setMessage('Please select a file');
      return;
    }

    setLoading(true);
    setMessage('');
    
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:8000/api/journal/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      
      if (response.data.success) {
        setMessage(`File ${response.data.filename} uploaded successfully!`);
        setFile(null);
      }
    } catch (error) {
      setMessage('Error uploading file');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getInsight = async () => {
    if (!entryId) {
      setMessage('Please save a journal entry first');
      return;
    }

    setLoading(true);
    setMessage('');
    
    try {
      const response = await axios.post('http://localhost:8000/api/journal/insight', {
        entry_id: entryId
      });
      
      if (response.data.success) {
        setInsight(response.data.insight);
        setMessage('Insight generated successfully!');
      }
    } catch (error) {
      setMessage('Error getting insight');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">DailyInsightAI Journal</h1>
      
      <div className="space-y-6">
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
            Journal Entry
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            rows={8}
            placeholder="Write your thoughts here..."
          />
        </div>

        <div>
          <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-2">
            Tags (comma-separated)
          </label>
          <input
            id="tags"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="learning, programming, ideas..."
          />
        </div>

        <div className="flex flex-wrap gap-4">
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Submit Entry'}
          </button>

          <div className="flex items-center gap-2">
            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="hidden"
            />
            <label
              htmlFor="file-upload"
              className="px-6 py-3 bg-gray-600 text-white rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 cursor-pointer"
            >
              Select File
            </label>
            {file && (
              <button
                onClick={handleFileUpload}
                disabled={loading}
                className="px-6 py-3 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Upload {file.name}
              </button>
            )}
          </div>

          <button
            onClick={getInsight}
            disabled={loading || !entryId}
            className="px-6 py-3 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Getting Insight...' : 'Get AI Insight'}
          </button>
        </div>

        {message && (
          <div className={`p-4 rounded-md ${message.includes('Error') ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'}`}>
            {message}
          </div>
        )}

        {insight && (
          <div className="p-6 bg-purple-50 rounded-md border border-purple-200">
            <h3 className="text-lg font-semibold text-purple-800 mb-2">AI Insight</h3>
            <p className="text-gray-700">{insight}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default JournalEntry;