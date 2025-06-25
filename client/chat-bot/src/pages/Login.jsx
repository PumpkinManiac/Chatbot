import React, { useEffect } from "react";
import { IoIosLogIn } from "react-icons/io";
import { Box, Typography, Button } from "@mui/material";
import CustomizedInput from "../component/shared/CustomizedInput.jsx";
import { toast } from "react-hot-toast";
import { useAuth } from "../context/Authcontext.jsx";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const auth = useAuth();

  /* ────────── Handle form submit ────────── */
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      toast.loading("Signing in…", { id: "login" });
      await auth?.login(email, password);
      toast.success("Signed in successfully!", { id: "login" });
    } catch (err) {
      console.error(err);
      toast.error("Sign‑in failed", { id: "login" });
    }
  };

  /* ────────── Redirect if already logged in ────────── */
  useEffect(() => {
    if (auth?.user) navigate("/chat");
  }, [auth, navigate]);

  /* ────────── Render ────────── */
  return (
    <Box width="100%" height="100%" display="flex" flex={1}>
      {/* Illustration (desktop only) */}
      <Box
        padding={8}
        mt={8}
        display={{ md: "flex", sm: "none", xs: "none" }}
      >
        <img src="airobot.png" alt="Robot" style={{ width: 400 }} />
      </Box>

      {/* Form */}
      <Box
        display="flex"
        flex={{ xs: 1, md: 0.5 }}
        justifyContent="center"
        alignItems="center"
        padding={2}
        ml="auto"
        mt={16}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            margin: "auto",
            padding: 30,
            boxShadow: "10px 10px 20px #000",
            borderRadius: 10,
          }}
        >
          <Box display="flex" flexDirection="column" alignItems="center">
            <Typography variant="h4" padding={2} fontWeight={600}>
              Login
            </Typography>

            <CustomizedInput type="email" name="email" label="Email" />
            <CustomizedInput type="password" name="password" label="Password" />

            <Button
              type="submit"
              sx={{
                px: 2,
                py: 1,
                mt: 2,
                width: 400,
                borderRadius: 2,
                bgcolor: "#00fffc",
                ":hover": { bgcolor: "white", color: "black" },
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