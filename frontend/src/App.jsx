import React from 'react';

function App() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-lg max-w-md w-full text-center">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Smart Resort 360</h1>
        <div className="inline-flex items-center justify-center p-2 bg-green-100 rounded-full mb-4">
          <svg className="w-8 h-8 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <p className="text-xl font-semibold text-gray-700">Foundation setup complete</p>
        <p className="text-gray-500 mt-2">Phase 1 architecture is successfully initialized.</p>
      </div>
    </div>
  );
}

export default App;
