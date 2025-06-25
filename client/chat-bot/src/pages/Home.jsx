import TypingAnim from "../component/typer/TypingAnim.jsx";
import NavigationLink from "../component/shared/NavigationLink.jsx";
import { useAuth } from "../context/Authcontext.jsx";
import Lottie from "lottie-react";
import robotAnimation from "../assets/Animation - 1750501753313.json";
import girlAnimation from "../assets/Animation - Girl.json";

const Home = () => {
  const auth = useAuth();

  return (
    <div className="w-full min-h-screen bg-[#b4c5e4] text-white flex flex-col">
      {/* Typing animation headline */}
      <div className="mt-6 flex justify-center px-4">
        <TypingAnim />
      </div>

      {/* Main content */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-20 py-12 flex-grow">
        
        {/* Left Animated Robot */}
        <div className="flex-1 flex justify-center items-center">
          <Lottie
            animationData={robotAnimation}
            loop
            autoplay
            className="w-72 sm:w-80 md:w-[24rem] drop-shadow-2xl"
          />
        </div>

        {/* Right Side with Girl Animation above text */}
        <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left space-y-6">
          {/* Girl Animation above text */}
          <div className="w-40 sm:w-48 md:w-56 mx-auto md:mx-0">
            <Lottie
              animationData={girlAnimation}
              loop
              autoplay
              className="drop-shadow-xl"
            />
          </div>

          {/* Description */}
          <p className="text-lg md:text-xl font-medium text-white leading-relaxed">
            Interact with our <span className="font-semibold text-[#1a1a1a]">Gemini Bot</span> to get instant answers. <br />
            Sign up to save conversations and tailor the chatbot to your personal experience.
          </p>

          {/* Get Started Button */}
          <div>
            <NavigationLink
              bg="#00fffc"
              to="/signup"
              text="Get Started"
              textColor="black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
