import React, { useEffect, useState } from "react";
import { IoIosLogIn, IoIosMail } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../component/shared/CustomizedInput.jsx";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/Authcontext.jsx";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import robotAnimation from "../assets/Animation - 1750501753313.json"; // Replace with your robot animation

const Signup = () => {
  const navigate = useNavigate();
  const auth = useAuth();
  const [emailSent, setEmailSent] = useState(false);
  const [emailValue, setEmailValue] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      toast.loading("Signing Up", { id: "signup" });
      await auth?.signup(name, email, password);
      toast.success("Signup successful! Check your email", { id: "signup" });
      setEmailValue(email);
      setEmailSent(true);
    } catch (error) {
      console.error(error);
      toast.error("User already exists with this email", { id: "signup" });
      setEmailSent(false);
    }
  };

  useEffect(() => {
    if (auth?.user) {
      navigate("/chat");
    }
  }, [auth, navigate]);

  // ✅ Email confirmation message
  if (emailSent) {
    return (
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
        sx={{ backgroundColor: "#b4c5e4" }}
        p={4}
      >
        <Box textAlign="center" bgcolor="white" p={4} borderRadius={4} boxShadow={3}>
          <IoIosMail size={48} color="#00fffc" />
          <Typography variant="h5" mt={2} mb={1} fontWeight={600}>
            Almost there!
          </Typography>
          <Typography>
            We’ve sent a verification link to <strong>{emailValue}</strong>.
            <br />
            Please check your inbox and click the link to activate your account.
          </Typography>
          <Button
            variant="contained"
            sx={{ mt: 3, bgcolor: "#00fffc", color: "black", fontWeight: 600 }}
            onClick={() => navigate("/login")}
          >
            Go to Login
          </Button>
        </Box>
      </Box>
    );
  }

  // Signup Form
  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        backgroundColor: "#b4c5e4",
      }}
    >
      {/* Left Side Animation */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "flex" },
          justifyContent: "center",
          alignItems: "center",
          p: 4,
        }}
      >
        <Lottie
          animationData={robotAnimation}
          loop
          autoplay
          style={{ width: "90%", maxWidth: "500px" }}
        />
      </Box>

      {/* Right Side - Signup Form */}
      <Box
        display="flex"
        flex={1}
        justifyContent="center"
        alignItems="center"
        py={6}
        px={2}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "450px",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            padding: "30px",
            borderRadius: "12px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h4"
              sx={{
                color: "white",
                mb: 3,
                fontWeight: 600,
                textShadow: "1px 1px 8px rgba(0,0,0,0.5)",
              }}
            >
              Create Account
            </Typography>

            <CustomizedInput type="text" name="name" label="Name" />
            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />

            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 3,
                width: "100%",
                borderRadius: "8px",
                bgcolor: "#00fffc",
                color: "#000",
                fontWeight: "bold",
                textTransform: "none",
                boxShadow: "0 4px 10px rgba(0,0,0,0.3)",
                ":hover": {
                  bgcolor: "#fff",
                  color: "#000",
                },
              }}
              endIcon={<IoIosLogIn />}
            >
              Signup
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Signup;
