import { motion, useAnimation } from 'framer-motion';
import { useState, useEffect } from 'react';

const AnimationPreview = ({ animation, onSelect }) => {
  const controls = useAnimation();
  const [isPlaying, setIsPlaying] = useState(false);

  const playAnimation = async () => {
    setIsPlaying(true);
    await controls.start(animation.animate);
    setIsPlaying(false);
  };

  return (
    <div className="animation-preview p-6 bg-white rounded-lg shadow-lg">
      <div className="preview-container h-40 flex items-center justify-center">
        <motion.div
          initial={animation.initial}
          animate={controls}
          className="preview-element w-20 h-20 bg-blue-500 rounded"
        />
      </div>

      <div className="controls mt-4 flex justify-between items-center">
        <button
          onClick={playAnimation}
          disabled={isPlaying}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          {isPlaying ? 'Playing...' : 'Play Animation'}
        </button>
        
        <button
          onClick={() => onSelect(animation)}
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded hover:bg-blue-50"
        >
          Use Animation
        </button>
      </div>
    </div>
  );
};

export default AnimationPreview;
