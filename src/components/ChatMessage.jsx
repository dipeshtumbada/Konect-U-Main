// ChatMessage.jsx
import React from 'react';

const USER_AVATAR = '👤';
const BOT_AVATAR = '🤖';

const ChatMessage = ({ role, content }) => {
  const avatar = role === 'user' ? USER_AVATAR : BOT_AVATAR;
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} my-2`}>
      <div className="flex items-start max-w-full lg:max-w-[calc(100%-50px)]">
        <div className="text-2xl mx-2">{avatar}</div>
        <div className="p-4 max-w-xs lg:max-w-full mr-4">
          <p style={{ color: role === 'user' ? 'cyan' : 'white' }}>{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
