import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../component/shared/CustomizedInput.jsx";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/Authcontext.jsx";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import robotAnimation from "../assets/Animation - 1750501753313.json"; // Lottie JSON file

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  // ────────── Handle form submit ──────────
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      toast.loading("Logging in…", { id: "login" });
      await auth?.login(email, password);
      toast.success("Logged in successfully!", { id: "login" });
      navigate("/chat");
    } catch (err) {
      console.error("Login error:", err);
      const msg = err?.response?.data?.message || "Login failed";
      toast.error(msg, { id: "login" });
    }
  };

  // ────────── Redirect if already logged in ──────────
  useEffect(() => {
    if (auth?.user) navigate("/chat");
  }, [auth, navigate]);

  // ────────── Render ──────────
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

      {/* Right Side - Form */}
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          py: 8,
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            width: "100%",
            maxWidth: "450px",
            margin: "auto",
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(8px)",
            borderRadius: "12px",
            padding: "30px",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.3)",
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography
              variant="h4"
              sx={{
                color: "#fff",
                mb: 3,
                fontWeight: 600,
                textShadow: "1px 1px 10px rgba(0,0,0,0.6)",
              }}
            >
              Login to Your ChatBot
            </Typography>

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
              Login
            </Button>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default Login;
