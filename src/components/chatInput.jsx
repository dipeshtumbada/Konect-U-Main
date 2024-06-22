import React, { useState } from 'react';

const ChatInput = ({ onSend }) => {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim() !== '') {
      onSend(input);
      setInput('');
    }
  };

  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="flex flex-col lg:flex-row w-full">
      <input
        type="text"
        className="flex-1 lg:w-2/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-primary mb-2 lg:mb-0"
        value={input}
        onChange={handleChange}
        placeholder="Type a message..."
        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
      />
      <button
        className="bg-radgradient py-2 px-4 rounded-lg text-white lg:ml-2"
        onClick={handleSend}
      >
        Send
      </button>
    </div>
  );
};

export default ChatInput;
