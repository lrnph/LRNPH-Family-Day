import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import minecraftAnimation from "../json/loader.json";
import Lottie from "lottie-react";

const loadingMessages = [
  "Generating Chunks...",
  "Loading Terrain...",
  "Generating Biomes...",
  "Spawning Mobs...",
  "Creating Structures...",
  "Building World...",
  "Finishing Touches..."
];

const Loader = () => {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % loadingMessages.length);
    }, 2000); 
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-neutral-900 gap-6">
      <figure className="w-40 h-20 flex items-center justify-center p-2 bg">
        <Lottie animationData={minecraftAnimation} loop={true} autoplay={true} />
      </figure>

      <motion.p
        className="text-white font-minecraft-3 text-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        key={currentMessageIndex} // animate when message changes
      >
        {loadingMessages[currentMessageIndex]}
      </motion.p>
    </div>
  );
};

export default Loader;
