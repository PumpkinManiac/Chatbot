import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Box, Avatar, Typography, Button, IconButton } from '@mui/material';
import { red } from '@mui/material/colors';
import { IoMdSend } from 'react-icons/io';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../context/Authcontext.jsx';
import ChatItem from '../component/chat/ChatItem.jsx'
import {
  deleteUserChats,
  getUserChats,
  sendChatRequest,
} from '../helpers/api-communicator';

 const chatMessages = [
  {
    "role": "user",
    "message": "Hi there, I'm looking for some information about artificial intelligence."
  },
  {
    "role": "assistant",
    "message": "Hello! I can definitely help with that. What specific aspects of AI are you interested in?"
  },
  {
    "role": "user",
    "message": "Could you give me a brief overview of what AI is and its main applications?"
  },
  {
    "role": "assistant",
    "message": "AI, or Artificial Intelligence, refers to the simulation of human intelligence processes by machines, especially computer systems. Its main applications include natural language processing (like chatbots), machine learning (for predictions and recommendations), computer vision (for image recognition), and robotics."
  },
  {
    "role": "user",
    "message": "That's a great start! Are there any ethical concerns related to AI development?"
  },
  {
    "role": "assistant",
    "message": "Yes, absolutely. Key ethical concerns include data privacy, algorithmic bias, job displacement, and the potential for misuse. Responsible AI development focuses on addressing these issues to ensure fair and beneficial use of the technology."
  }
]


const Chat = () => {
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const auth = useAuth();

  // ------------- Local state for messages -------------------------
  const [chatMessages, setChatMessages] = useState([]); // [{ role, content }]

  // ------------- Send a new message -------------------------------
  const handleSubmit = async () => {
    const content = inputRef.current?.value || '';
    if (!content.trim()) return;

    // clear input
    if (inputRef.current) inputRef.current.value = '';

    // add user message optimistically
    setChatMessages((prev) => [...prev, { role: 'user', content }]);

    try {
      const chatData = await sendChatRequest(content); // returns { chats: [...] }
      setChatMessages(chatData.chats);
    } catch (err) {
      toast.error('Failed to send message');
      console.error(err);
    }
  };

  // ------------- Clear conversation -------------------------------
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

  // ------------- Load existing chats on mount ---------------------
  useLayoutEffect(() => {
    if (auth?.isLoggedIn && auth.user) {
      toast.loading('Loading chats…', { id: 'loadchats' });
      getUserChats()
        .then((data) => {
          setChatMessages(data.chats);
          toast.success('Chats loaded', { id: 'loadchats' });
        })
        .catch((err) => {
          toast.error('Loading failed', { id: 'loadchats' });
          console.error(err);
        });
    }
  }, [auth]);

  // ------------- Redirect to login if not authenticated -----------
  useEffect(() => {
    if (!auth?.user) navigate('/login');
  }, [auth, navigate]);

  // ------------- Render -------------------------------------------
  return (
    <Box
      sx={{
        display: 'flex',
        flex: 1,
        width: '100%',
        height: '100%',
        mt: 3,
        gap: 3,
      }}
    >
      {/* ---------- LEFT SIDEBAR (DESKTOP) ---------- */}
      <Box
        sx={{
          display: { md: 'flex', xs: 'none', sm: 'none' },
          flex: 0.2,
          flexDirection: 'column',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            height: '60vh',
            bgcolor: 'rgb(17,29,39)',
            borderRadius: 5,
            flexDirection: 'column',
            mx: 3,
          }}
        >
          <Avatar
            sx={{
              mx: 'auto',
              my: 2,
              bgcolor: 'white',
              color: 'black',
              fontWeight: 700,
            }}
          >
            {auth?.user?.name?.[0]}
            {auth?.user?.name?.split(' ')[1]?.[0]}
          </Avatar>

          <Typography sx={{ mx: 'auto', fontFamily: 'work sans' }}>
            You are talking to a ChatBOT
          </Typography>

          <Typography
            sx={{ mx: 'auto', fontFamily: 'work sans', my: 4, p: 3 }}
          >
            You can ask questions about knowledge, business, advice, education,
            etc. But avoid sharing personal information.
          </Typography>

          <Button
            onClick={handleDeleteChats}
            sx={{
              width: '200px',
              my: 'auto',
              color: 'white',
              fontWeight: 700,
              borderRadius: 3,
              mx: 'auto',
              bgcolor: red[300],
              ':hover': { bgcolor: red.A400 },
            }}
          >
            Clear Conversation
          </Button>
        </Box>
      </Box>

      {/* ---------- MAIN CHAT AREA ---------- */}
      <Box
        sx={{
          display: 'flex',
          flex: { md: 0.8, xs: 1, sm: 1 },
          flexDirection: 'column',
          px: 3,
        }}
      >
        <Typography
          sx={{
            fontSize: '40px',
            color: 'white',
            mb: 2,
            mx: 'auto',
            fontWeight: 600,
          }}
        >
          Gemini – Flask‑2.5 
        </Typography>

        {/* Message list */}
        <Box
          sx={{
            width: '100%',
            height: '60vh',
            borderRadius: 3,
            mx: 'auto',
            display: 'flex',
            flexDirection: 'column',
            overflowX: 'hidden',
            overflowY: 'auto',
            scrollBehavior: 'smooth',
          }}
        >
          {chatMessages.map((chat,index) => (
            <ChatItem
              key={index}
              content={chat.content}
              role={chat.role}
            />
          ))}
        </Box>

        {/* Input box */}
        <div
          style={{
            width: '100%',
            borderRadius: 8,
            backgroundColor: 'rgb(17,27,39)',
            display: 'flex',
            margin: 'auto',
          }}
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Type your message…"
            style={{
              flex: 1,
              backgroundColor: 'transparent',
              padding: '30px',
              border: 'none',
              outline: 'none',
              color: 'white',
              fontSize: '20px',
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />
          <IconButton onClick={handleSubmit} sx={{ color: 'white', mx: 1 }}>
            <IoMdSend />
          </IconButton>
        </div>
      </Box>
    </Box>
  );
};

export default Chat;
