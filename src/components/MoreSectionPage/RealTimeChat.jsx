import React, { useState, useEffect, useRef } from 'react';
import '../../styles/realchat.css';
import { FaArrowDown, FaBars, FaTimes } from 'react-icons/fa';

const chatData = {
  Priya: [
    { from: 'me', text: 'Hey Priya, done with your tasks?' },
    { from: 'other', text: 'Yes, just finished them now.' },
  ],
  John: [
    { from: 'other', text: 'Hey! Are we meeting at 2 PM?' },
    { from: 'me', text: 'Yes John, see you then.' },
  ],
  Ravi: [
    { from: 'me', text: 'Hi Ravi, ready for the sprint planning?' },
    { from: 'other', text: 'Almost. Give me 10 mins.' },
  ]
};

const statuses = {
  Priya: 'online',
  John: 'offline',
  Ravi: 'online',
};

const RealTimeChat = () => {
  const [selectedUser, setSelectedUser] = useState('Priya');
  const [input, setInput] = useState('');
  const [chats, setChats] = useState(chatData);
  const [typing, setTyping] = useState(false);
  const [showSidebar, setShowSidebar] = useState(false);
  const chatBodyRef = useRef(null);
  const [scrollBtnVisible, setScrollBtnVisible] = useState(false);



  const sendMessage = () => {
    if (!input.trim()) return;

    const newMessage = { from: 'me', text: input };
    const updatedChat = [...chats[selectedUser], newMessage];
    setChats({ ...chats, [selectedUser]: updatedChat });
    setInput('');

    setTyping(true);

    setTimeout(() => {
      const newChat = [...updatedChat];
      newChat.push({ from: 'other', text: 'Okay!' });

      setChats({ ...chats, [selectedUser]: newChat });
      setTyping(false);
    }, 2500);
  };



  useEffect(() => {
    const chatBody = chatBodyRef.current;

    const handleScroll = () => {
      const nearBottom = chatBody.scrollHeight - chatBody.scrollTop - chatBody.clientHeight < 100;
      setScrollBtnVisible(!nearBottom);
    };

    chatBody.addEventListener('scroll', handleScroll);
    return () => chatBody.removeEventListener('scroll', handleScroll);
  }, []);



  useEffect(() => {
    const chatBody = chatBodyRef.current;
    if (chatBody) {
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }, [chats]);

  const scrollToBottom = () => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  };



  return (
    <div className={`chat-container ${showSidebar ? 'sidebar-open' : ''}`}>
      <button
        className="hamburger"
        onClick={() => setShowSidebar(!showSidebar)}
        aria-label={showSidebar ? 'Close sidebar' : 'Open sidebar'}
      >
        {showSidebar ? <FaTimes /> : <FaBars />}
      </button>

      {showSidebar && (
        <div className="chat-sidebar">
          <h3>Chats</h3>
          <ul>
            {Object.keys(chats).map((user) => (
              <li
                key={user}
                className={selectedUser === user ? 'active' : ''}
                onClick={() => {
                  setSelectedUser(user);
                  // Optional: Auto-close sidebar on mobile when a user is selected
                  if (window.innerWidth <= 768) {
                    setShowSidebar(false);
                  }
                }}
              >
                {user} <span className={`status ${statuses[user]}`}></span>
              </li>
            ))}
          </ul>
        </div>
      )}


      <div className="chat-box">
        <div className={showSidebar ? 'chat-header ' : 'chat-header makespace'}>
          <button
            className="mobile-menu-btn"
            onClick={() => setShowSidebar(!showSidebar)}
          >
            <FaBars />
          </button>
          {selectedUser}
        </div>

        <div className="chat-body" ref={chatBodyRef}>
          {chats[selectedUser].map((msg, idx) => (
            <div key={idx} className={`message ${msg.from}`}>
              <span>{msg.text}</span>
            </div>
          ))}

          {typing && (
            <div className="message other typing">
              <div className="typing-indicator">
                Typing
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          )}
        </div>

        {scrollBtnVisible && (
          <button className="scroll-btn" onClick={scrollToBottom}>
            <FaArrowDown />
          </button>
        )}

        <div className="chat-footer">
          <input
            type="text"
            placeholder={`Message ${selectedUser}...`}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default RealTimeChat;