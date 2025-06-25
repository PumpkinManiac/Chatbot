import React from "react";
import { Link } from "react-router-dom";

const NavigationLink = ({ to, bg, text, textColor, onClick }) => {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="nav-link"
      style={{ background: bg, color: textColor }}
    >
      {text}
    </Link>
  );
};

export default NavigationLink;
