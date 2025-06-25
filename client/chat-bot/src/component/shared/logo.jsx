import React from "react";
import { Link } from "react-router-dom";
import Typography from "@mui/material/Typography";

const Logo = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "15px",
        marginRight: "auto",
      }}
    >
      <Link to="/">
        <img
          src="gemini.png"
          alt="Gemini Logo"
          width="30"
          height="30"
          className="image-inverted"
        />
      </Link>
      <Typography
        sx={{
          display: { md: "block", sm: "none", xs: "none" },
          fontWeight: "800",
          textShadow: "2px 2px 20px #000",
        }}
      >
        <span style={{ fontSize: "20px" }}>MERN</span>-
      </Typography>
    </div>
  );
};

export default Logo;
