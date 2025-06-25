import React from "react";
import { TypeAnimation } from "react-type-animation";

const TypingAnim = () => {
  return (
    <TypeAnimation
      sequence={[
        "Welcome to the AI World",
        1500,
        "Powered by GEMINI 2.0",
        1500,
        "Custom Chat Experience ✨",
        1500,
        "Secure. Smart. Yours 🔒",
        1500,
      ]}
      speed={60}
      wrapper="span"
      className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white text-center drop-shadow-xl"
      repeat={Infinity}
    />
  );
};

export default TypingAnim;
