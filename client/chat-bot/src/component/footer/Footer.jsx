import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-[#b4c5e4] text-white text-center py-4">
      <p className="text-sm">
        © {new Date().getFullYear()} ChattBot Built PumpkinManiac
      </p>
    </footer>
  );
};

export default Footer;
