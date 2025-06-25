import React from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import TypingAnim from "../component/typer/TypingAnim.jsx"
import Footer from "../component/footer/Footer.jsx";

const Home = () => {
  const theme = useTheme();
  const isBelowMd = useMediaQuery(theme.breakpoints.down("md"));

  return (
    <Box width="100%" height="100%" overflow="hidden">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          mt: 3,
        }}
      >
        {/* Typing animation headline */}
        <TypingAnim />

        {/* Logo images section */}
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            justifyContent: "center",
            alignItems: "center",
            gap: 5,
            my: 10,
          }}
        >
          <img
            src="robot.png"
            alt="robot"
            style={{ width: 200, margin: "auto" }}
          />
          <img
            src="openai.png"
            alt="openai"
            className="image-inverted rotate"
            style={{ width: 200, margin: "auto" }}
          />
        </Box>

        {/* Chat preview image */}
        <Box display="flex" justifyContent="center" width="100%">
          <img
            src="chat.png"
            alt="chatbot"
            style={{
              width: isBelowMd ? "80%" : "60%",
              borderRadius: 20,
              boxShadow: "-5px -5px 105px #64f3d5",
              marginTop: 20,
              marginBottom: 20,
              padding: 10,
            }}
          />
        </Box>
      </Box>

      {/* Footer */}
      <Footer />
    </Box>
  );
};

export default Home;
