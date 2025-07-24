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
        setMessage('Journal entry saved successfully! Your insights are secure.');
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
    <div className="main-container relative z-10">
      <header className="text-center">
        <h1 className="header-title">DailyInsight AI</h1>
        <p className="header-subtitle">Your intelligent journaling and idea companion</p>
      </header>
      
      <main className="card">
        <h2 className="form-label text-xl mb-6 font-semibold">Today's Journal Entry</h2>
        
        <form>
          <div className="mb-6">
            <label className="sr-only" htmlFor="journal-entry">Journal Entry</label>
            <textarea
              className="textarea"
              id="journal-entry"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="What's on your mind today? Reflect, dream, and discover..."
            />
          </div>
          
          <div className="mb-8">
            <label className="form-label" htmlFor="tags">Tags (comma-separated)</label>
            <input
              className="input"
              id="tags"
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. personal, work, ideas, gratitude"
            />
          </div>
          
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center flex-wrap gap-4">
              <button
                className="btn btn-primary"
                type="button"
                onClick={handleSubmit}
                disabled={loading}
              >
                <span className="material-icons btn-icon">save</span>
                {loading ? 'Saving...' : 'Save Entry'}
              </button>
              
              <div className="file-input-wrapper">
                <button className="btn btn-secondary" type="button">
                  <span className="material-icons btn-icon">attach_file</span>
                  Attach File
                </button>
                <input
                  id="file-upload"
                  type="file"
                  onChange={handleFileChange}
                />
              </div>
              
              {file && (
                <>
                  <span className="file-input-label">
                    {file.name}
                  </span>
                  <button
                    className="btn btn-primary"
                    type="button"
                    onClick={handleFileUpload}
                    disabled={loading}
                  >
                    <span className="material-icons btn-icon">cloud_upload</span>
                    {loading ? 'Uploading...' : 'Upload'}
                  </button>
                </>
              )}
            </div>
            
            <button
              className="btn btn-orange"
              type="button"
              onClick={getInsight}
              disabled={loading || !entryId}
            >
              <span className="material-icons btn-icon">auto_awesome</span>
              {loading ? 'Generating...' : 'Get AI Insight'}
            </button>
          </div>
        </form>
        
        {message && (
          <div className={message.includes('Error') ? 'error-message' : 'success-message'}>
            <span className={`material-icons ${message.includes('Error') ? 'error-icon' : 'success-icon'}`}>
              {message.includes('Error') ? 'error' : 'check_circle'}
            </span>
            <span>{message}</span>
          </div>
        )}
        
        {insight && (
          <div className="success-message">
            <span className="material-icons success-icon">lightbulb</span>
            <div>
              <strong>AI Insight:</strong>
              <div className="mt-2" style={{whiteSpace: 'pre-wrap'}}>{insight}</div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default JournalEntry;