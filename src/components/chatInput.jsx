import React, { useState } from 'react';
import './ChatInput.css'; // Import the CSS file

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput(''); // Clear the input field
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full gap-2">
      <div className="input-div">
        <input className="input" name="file" type="file" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          stroke-linejoin="round"
          stroke-linecap="round"
          viewBox="0 0 24 24"
          stroke-width="2"
          fill="none"
          stroke="currentColor"
          className="icon"
        >
          <polyline points="16 16 12 12 8 16"></polyline>
          <line y2="21" x2="12" y1="12" x1="12"></line>
          <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path>
          <polyline points="16 16 12 12 8 16"></polyline>
        </svg>
      </div>
      <input
        type="text"
        className="flex-1 lg:w-2/3 px-2 py-1 border border-gray-300 rounded-lg focus:outline-none focus:border-primary mb-2 lg:mb-0"
        value={input}
        onChange={handleChange}
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button onClick={handleSend}>
        <div className="svg-wrapper-1">
          <div className="svg-wrapper">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="none" d="M0 0h24v24H0z"></path>
              <path
                fill="currentColor"
                d="M1.946 9.315c-.522-.174-.527-.455.01-.634l19.087-6.362c.529-.176.832.12.684.638l-5.454 19.086c-.15.529-.455.547-.679.045L12 14l6-8-8 6-8.054-2.685z"
              ></path>
            </svg>
          </div>
        </div>
        <span>Send</span>
      </button>
    </div>
  );
};

export default ChatInput;
