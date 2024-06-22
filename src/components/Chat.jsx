import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './chatInput'; // Corrected import name to match the filename
import { chatPages, profiles } from '../constants'; // Import chat pages and profiles

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentChatPage, setCurrentChatPage] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]); // Initialize with the first profile
  const messagesEndRef = useRef(null);

  // Load selected chat page messages
  useEffect(() => {
    if (currentChatPage) {
      setMessages(currentChatPage.messages);
    }
  }, [currentChatPage]);

  // Scroll to the bottom of the chat window
  useEffect(() => {
    if (messages.length > 0) {
      scrollToBottom();
    }
  }, [messages]);

  // Scroll to the bottom of the chat window
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Handle sending a message
  const sendMessage = (message) => {
    const userMessage = { role: 'user', content: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    // Simulate a response from an API (replace with actual API call if needed)
    setTimeout(() => {
      const botMessage = { role: 'assistant', content: 'This is a dummy response.' };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    }, 500); // Simulated delay

    scrollToBottom();
  };

  // Handle selecting a chat page
  const handleChatPageSelect = (chatPage) => {
    setCurrentChatPage(chatPage);
  };

  return (
    <div className="relative h-screen p-4">
      {/* Dropdown Button */}
      <button
        id="dropdownInformationButton"
        data-dropdown-toggle="dropdownInformation"
        className="text-primary-bg font-bold text-base m-4 mr-[80px] bg-radgradient hover:bg-orange-800 focus:ring-4 focus:outline-none focus:ring-orange-300 rounded-full px-4 py-2.5 text-center inline-flex items-center absolute top-4 right-4 z-10"
        type="button"
      >
        {/* Icon or text for the button */}
        {selectedProfile.name.charAt(0).toUpperCase()}
      </button>

      {/* Dropdown Content */}
      <div
        id="dropdownInformation"
        className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-[300px] absolute top-12 right-4 dark:bg-gray-700 dark:divide-gray-600"
      >
        <div className="px-5 py-3 text-sm text-gray-900 dark:text-white">
          <div>{selectedProfile.name}</div>
        </div>
        <ul className="flex flex-col gap-4 py-2 p-5 text-sm text-gray-200" aria-labelledby="dropdownInformationButton">
          <li>
            <p><strong>Education:</strong> {selectedProfile.education}</p>
          </li>
          <li>
            <p><strong>School:</strong> {selectedProfile.school}</p>
          </li>
          <li>
            <p><strong>Work History:</strong> {selectedProfile.workHistory}</p>
          </li>
          <li>
            <p><strong>Hobbies:</strong> {selectedProfile.hobbies}</p>
          </li>
          <li>
            <p><strong>Skills:</strong> {selectedProfile.skills}</p>
          </li>
        </ul>

        <div className="py-2">
          <a href="/" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Home</a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Settings</a>
          <a href="#" className="block px-4 py-2 text-sm hover:bg-gray-600 text-gray-200 hover:text-white">Sign Out</a>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex flex-col-reverse lg:flex-row h-full gap-4 relative">
        {/* Chat History Section */}
        <div
          id="chatHistory"
          className="w-full lg:w-1/4 h-full bg-bg bg-opacity-15 text-white p-6 flex flex-col items-start rounded-xl"
        >
          <p className="text-lg font-semibold mb-4">Chat History</p>
          <div className="overflow-y-auto w-full">
            <ul>
              {chatPages.map((chatPage) => (
                <li
                  key={chatPage.id}
                  className="cursor-pointer p-4 mb-2 bg-bg bg-opacity-20 rounded-lg hover:bg-opacity-60"
                  onClick={() => handleChatPageSelect(chatPage)}
                >
                  {chatPage.title}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Main Chat Section */}
        <div
          id="chat"
          className="w-full lg:w-3/4 h-full bg-gray-800 text-white flex flex-col justify-between p-6 rounded-xl overflow-hidden"
        >
          <div className="text-xl lg:text-2xl font-semibold mb-4 text-radGradient">Konect - U</div>

          {/* Chat Messages Section */}
          <div className="overflow-y-auto flex-1 mb-4">
            {messages.map((message, index) => (
              <ChatMessage key={index} role={message.role} content={message.content} />
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Section */}
          <div className="text-primary-bg">
            <ChatInput onSend={sendMessage} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
