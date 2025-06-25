import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer style={{ width: "100%", marginTop: 60, padding: "20px 0" }}>
      <div
        style={{
          minHeight: "20vh",
          maxHeight: "30vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <p style={{ fontSize: "24px", textAlign: "center", color: "#fff" }}>
          Built with ❤️ by{" "}
          <Link
            to={"https://youtube.com/indiancoders"}
            className="nav-link"
            style={{ color: "#00fffc", textDecoration: "underline" }}
            target="_blank"
            rel="noopener noreferrer"
          >
            Indian Coders
          </Link>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
