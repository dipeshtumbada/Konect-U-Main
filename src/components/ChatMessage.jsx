import React from 'react';

const USER_AVATAR = '👤';
const BOT_AVATAR = '🤖';

const ChatMessage = ({ role, content }) => {
  const avatar = role === 'user' ? USER_AVATAR : BOT_AVATAR;
  return (
    <div className={`flex ${role === 'user' ? 'justify-end' : 'justify-start'} my-2`}>
      <div className="flex items-start">
        <div className="text-2xl mx-2">{avatar}</div>
        <div className="bg-white p-4 rounded-lg shadow-md max-w-xs">
          <p className="text-bg">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;
