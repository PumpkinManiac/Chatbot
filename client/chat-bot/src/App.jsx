import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./component/Header";
import Footer from "./component/footer/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Chat from "./pages/Chat";
import NotFound from "./pages/NotFound";
import EmailVerify from "./pages/EmailVerify.jsx";
import { useAuth } from "./context/Authcontext.jsx";

// Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const auth = useAuth();
  if (!auth?.isLoggedIn || !auth.user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

function App() {
  const auth = useAuth();

  return (  
    <main>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/verify-email" element={<EmailVerify />} />
        {auth?.isLoggedIn && auth.user && (<Route
          path="/chat"
          element={
            <ProtectedRoute>
              <Chat />
            </ProtectedRoute>
          }
        /> )}
        <Route path="*" element={<NotFound />} />
      </Routes>
      {/* Show footer only on non-auth pages */}
          {!auth?.isLoggedIn && <Footer />}
    </main>
  );
}

export default App;
