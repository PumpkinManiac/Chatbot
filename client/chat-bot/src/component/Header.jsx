import React from "react";
import { useAuth } from "../context/Authcontext.jsx";
import { Link } from "react-router-dom";
import  Lottie  from "lottie-react";
import logoAnimation from "../assets/Animation - 1750502487855.json"; // animated logo

const Header = () => {
  const auth = useAuth();

  return (
    <header className="w-full bg-[#b4c5e4] text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Animated Logo with Link */}
        <Link to="/" className="flex items-center">
          <div className="w-12 h-12 sm:w-14 sm:h-14">
            <Lottie animationData={logoAnimation} loop autoplay />
          </div>
          <span className="ml-2 text-xl sm:text-2xl font-semibold text-white hidden sm:inline-block drop-shadow-sm">
            CodeBot
          </span>
        </Link>

        {/* Navigation Links or Auth Actions */}
        <nav className="flex items-center gap-4">
          {auth?.isLoggedIn ? (
            <>
              <Link
                to="/chat"
                className="bg-white text-[#1a1a1a] font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Go to Chat
              </Link>
              <button
                onClick={auth.logout}
                className="bg-[#51538f] text-white font-medium px-4 py-2 rounded-md hover:bg-[#3f4072] transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="bg-white text-[#1a1a1a] font-medium px-4 py-2 rounded-md hover:bg-gray-100 transition"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-[#51538f] text-white font-medium px-4 py-2 rounded-md hover:bg-[#3f4072] transition"
              >
                Signup
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
