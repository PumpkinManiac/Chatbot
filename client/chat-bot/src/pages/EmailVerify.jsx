import React, { useEffect, useRef } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useAuth } from "../context/Authcontext.jsx";
import { toast } from "react-hot-toast";

const EmailVerify = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const auth = useAuth();
  const navigate = useNavigate();

  const toastId = useRef(null);

  useEffect(() => {
    const verify = async () => {
      try {
        toast.loading("Verifying email...");
        await auth.verifyEmail(token);
        toast.success("Email verified successfully!");
        navigate("/chat");
      } catch (err) {
        console.error(err);
        toast.error("Email verification failed.");
        navigate("/signup");
      }
    };

    if (token) verify();
  }, [token, auth, navigate]);

  return <div>Verifying your email...</div>;
};

export default EmailVerify;
