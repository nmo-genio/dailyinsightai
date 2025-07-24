import React from 'react';
import JournalEntry from './components/JournalEntry';

function App() {
  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="bg-decoration bg-decoration-1">
        <svg 
          width="256" 
          height="256" 
          viewBox="0 0 24 24" 
          fill="var(--secondary-color)" 
          className="w-full h-full"
        >
          <path d="M20 2H4c-1.1 0-2 .9-2 2v16c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm-1 18H5V4h14v16z"/>
          <path d="M7 6h10v2H7zm0 4h10v2H7zm0 4h7v2H7z"/>
        </svg>
      </div>
      
      <div className="bg-decoration bg-decoration-2">
        <svg 
          width="224" 
          height="224" 
          viewBox="0 0 100 100" 
          fill="var(--primary-color)" 
          className="w-full h-full"
        >
          <path d="M50 2.5a47.5 47.5 0 0147.5 47.5 47.5 47.5 0 01-47.5 47.5A47.5 47.5 0 012.5 50 47.5 47.5 0 0150 2.5zm0 5a42.5 42.5 0 00-42.5 42.5 42.5 42.5 0 0042.5 42.5 42.5 42.5 0 0042.5-42.5A42.5 42.5 0 0050 7.5zm-5 12.5h10v5h-10v-5zm-2.5 10h15v5h-15v-5zm-2.5 10h20v5h-20v-5zm0 10h20v5h-20v-5zm0 10h20v5h-20v-5zm2.5 10h15v5h-15v-5zm2.5 10h10v5h-10v-5z"/>
        </svg>
      </div>
      
      <JournalEntry />
    </div>
  );
}

export default App;