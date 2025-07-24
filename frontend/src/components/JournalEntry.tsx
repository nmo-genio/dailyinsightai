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
    <div className="max-w-4xl mx-auto p-4">
      {/* Simple Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">DailyInsight AI</h1>
        <p className="text-gray-600">Your intelligent journaling companion</p>
      </div>

      {/* Main Card - Simple and Clean */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        
        {/* Journal Entry Form */}
        <div className="space-y-6">
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
              Today's Journal Entry
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              rows={8}
              placeholder="What's on your mind today?"
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
              placeholder="personal, work, ideas..."
            />
          </div>

          {/* Simple Button Group */}
          <div className="flex flex-wrap gap-3">
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Saving...' : 'Save Entry'}
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
                className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700 cursor-pointer"
              >
                Select File
              </label>
              {file && (
                <button
                  onClick={handleFileUpload}
                  disabled={loading}
                  className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Upload {file.name}
                </button>
              )}
            </div>

            <button
              onClick={getInsight}
              disabled={loading || !entryId}
              className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Generating...' : 'Get AI Insight'}
            </button>
          </div>

          {/* Messages */}
          {message && (
            <div className={`p-4 rounded-md ${
              message.includes('Error') 
                ? 'bg-red-50 text-red-700 border border-red-200' 
                : 'bg-green-50 text-green-700 border border-green-200'
            }`}>
              {message}
            </div>
          )}

          {/* AI Insight */}
          {insight && (
            <div className="mt-6 p-4 bg-gray-50 rounded-md border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">AI Insight</h3>
              <p className="text-gray-700 whitespace-pre-wrap">{insight}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default JournalEntry;