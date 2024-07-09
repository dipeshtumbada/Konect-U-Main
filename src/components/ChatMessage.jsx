// ChatMessage.jsx
import React from 'react';

const USER_AVATAR = '👤';
const BOT_AVATAR = '🤖';

const ChatMessage = ({ role, content }) => {
  const avatar = role === 'user' ? USER_AVATAR : BOT_AVATAR;
  const formatContent = (content) => {
    return content.split('\n').map((line, index) => {
      if (line.startsWith('**') && line.endsWith('**')) {
        return (
          <div key={index} className="font-bold mb-2">
            {line.slice(2, -2)}
          </div>
        );
      } 
      if (line.startsWith('* ') || line.startsWith('+ ')) {
        return (
          <div key={index} className="mb-2">
            • {line.slice(2)}
          </div>
        );
      } else {
        return (
          <div key={index} className="mb-2">
            {line}
          </div>
        );
      }
    });
  };

  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} my-2`}>
      <div className="flex items-start max-w-full lg:max-w-[calc(100%-50px)]">
        <div className="text-2xl mx-2">{avatar}</div>
        <div className="p-4 max-w-xs lg:max-w-full mr-4">
          <p style={{ color: role === 'user' ? 'cyan' : 'white' }}>{formatContent(content)}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
