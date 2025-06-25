import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { IoMdSend } from 'react-icons/io';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/Authcontext.jsx';
import ChatItem from '../component/chat/ChatItem.jsx';
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../helpers/api-communicator';

const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const endOfMessagesRef = useRef(null);
  const auth = useAuth();
  const [chatMessages, setChatMessages] = useState([]);

  // Send message
  const handleSubmit = async () => {
    const content = inputRef.current?.value || '';
    if (!content.trim()) return;
    inputRef.current.value = '';
    setChatMessages(prev => [...prev, { role: 'user', content }]);
    try {
      const { chats } = await sendChatRequest(content);
      setChatMessages(chats);
    } catch (err) {
      toast.error('Failed to send message');
      console.error(err);
    }
  };

  // Delete chats
  const handleDeleteChats = async () => {
    try {
      toast.loading('Deleting chats…', { id: 'deletechats' });
      await deleteUserChats();
      setChatMessages([]);
      toast.success('Chats deleted', { id: 'deletechats' });
    } catch (err) {
      toast.error('Deleting chats failed', { id: 'deletechats' });
      console.error(err);
    }
  };

  // Load chats
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading('Loading chats…', { id: 'loadchats' });
      getUserChats()
        .then(({ chats }) => {
          setChatMessages(chats);
          toast.success('Chats loaded', { id: 'loadchats' });
        })
        .catch(err => {
          toast.error('Loading failed', { id: 'loadchats' });
          console.error(err);
        });
    }
  }, [auth]);

  // Redirect if not auth
  useEffect(() => {
    if (!auth?.user) navigate('/login');
  }, [auth, navigate]);

  // Auto-scroll
  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <div className="flex h-screen bg-[#b4c5e4] text-white flex-col p-4">
   
    {/* Top bar */}
      <div className="flex justify-between items-center mb-2" >
        <h1 className="text-xl sm:text-2xl font-semibold">Gemini – Flask‑2.5</h1>
        <button
          onClick={handleDeleteChats}
          className="bg-white hover:bg-gray-100 transition text-black font-bold py-1 px-4 rounded"
        >
          Clear Conversation
        </button>
      </div>
      {/* Main chat area */}
        <div className="flex-1 bg-[#51538f] bg-opacity-80 rounded-xl p-4 overflow-y-auto overflow-x-hidden">
         {chatMessages.length===0 ?(<div className="flex items-center justify-center h-full text-gray-400 text-center text-lg italic"> No messages yet. Start the conversation! </div>) : (
          chatMessages.map((chat, idx) => (
            <ChatItem key={idx} content={chat.content} role={chat.role} />
          ))
         )}
          <div ref={endOfMessagesRef} />
          
        </div>

        {/* Input */}
        <div className="mt-4 bg-[#51538f] bg-opacity-90 rounded-xl flex items-center p-2">
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message…"
            onKeyDown={e => e.key === 'Enter' && handleSubmit()}
            className="flex-1 bg-transparent outline-none border-none text-white placeholder-gray-400 px-4 py-2 text-base"
          />
          <button
            onClick={handleSubmit}
            className="text-white mx-2 focus:outline-none"
            aria-label="send"
          >
            <IoMdSend size={24} />
          </button>
        </div>
      </div>
  );
};

export default Chat;