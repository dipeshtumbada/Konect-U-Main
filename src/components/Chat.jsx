//chat.jsx
import React, { useState, useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage';
import ChatInput from './chatInput';
import { chatPages, profiles } from '../constants';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [currentChatPage, setCurrentChatPage] = useState(null);
  const [selectedProfile, setSelectedProfile] = useState(profiles[0]);
  const [isChatHistoryVisible, setIsChatHistoryVisible] = useState(true);
  const messagesEndRef = useRef(null);

  // Load selected chat page messages
  useEffect(() => {
    if (currentChatPage) {
      setMessages(currentChatPage.messages);
    }
  }, [currentChatPage]);

  // Scroll to the bottom of the chat window
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async (message) => {
    const userMessage = { role: 'user', content: message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch('http://54.164.186.90:5000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messages: [userMessage] }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Received response:', data);

      const botMessage = { role: 'assistant', content: data.response };
      setMessages((prevMessages) => [...prevMessages, botMessage]);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const toggleChatHistory = () => {
    setIsChatHistoryVisible(!isChatHistoryVisible);
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
        {/* Toggle Button for Chat History */}
        <div className="flex flex-col items-center lg:w-8 p-2">
          <button
            onClick={toggleChatHistory}
            className="bg-radgradient text-white p-4 rounded-lg mb-4 w-full flex items-center justify-center"
            style={{ fontSize: '24px' }}  // Larger arrow size
          >
            {isChatHistoryVisible ? '<' : '>'}
          </button>
        </div>

        {/* Chat History Section */}
        {isChatHistoryVisible && (
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
        )}

        {/* Main Chat Section */}
        <div
          id="chat"
          className={`w-full ${isChatHistoryVisible ? 'lg:w-3/4' : 'lg:w-full'} h-full bg-gray-800 text-white flex flex-col justify-between p-6 rounded-xl overflow-hidden chat-section`}
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
