import axios from 'axios';


export const loginUser = async (email, password) => {
  const res = await axios.post('/user/login', { email, password });
  if (res.status !== 200) {
    throw new Error('Unable to login');
  }
  return res.data;
};

export const signupUser = async (name, email, password) => {
  const res = await axios.post('/user/signup', { name, email, password });
  if (res.status !== 201) {
    throw new Error('Unable to signup');
  }
  return res.data;
};

export const verifyEmailUser = async (token) => {
  // GET /user/verify-email?token=...
   const res = await axios.get(`http://localhost:3000/api/v1/user/verify-email?token=${token}`, { withCredentials: true });
  if (res.status !== 200) {
    throw new Error(res.data?.message || "Email verification failed");
  }
  return res.data;
};

export const checkAuthStatus = async () => {
  const res = await axios.get('/user/auth-status');
  if (res.status !== 200) {
    throw new Error('Unable to authenticate');
  }
  return res.data;
};

export const logoutUser = async () => {
  const res = await axios.get('/user/logout');
  if (res.status !== 200) {
    throw new Error('Unable to logout');
  }
  return res.data;
};

/* ------------------------------------------------------------------ */
/*  Chat                                                              */
/* ------------------------------------------------------------------ */
export const sendChatRequest = async (message) => {
  const res = await axios.post('/chat/new', { message });
  if (res.status !== 200) {
    throw new Error('Unable to send chat');
  }
  return res.data;
};

export const getUserChats = async () => {
  const res = await axios.get('/chat/all-chats');
  if (res.status !== 200) {
    throw new Error('Unable to fetch chats');
  }
  return res.data;
};

export const deleteUserChats = async () => {
  const res = await axios.delete('/chat/delete');
  if (res.status !== 200) {
    throw new Error('Unable to delete chats');
  }
  return res.data;
};
