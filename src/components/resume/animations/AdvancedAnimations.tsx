import { motion, AnimatePresence } from 'framer-motion';

const animationPresets = {
  entrance: {
    fadeSlideUp: {
      initial: { opacity: 0, y: 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: 0.5 }
    },
    scaleFade: {
      initial: { opacity: 0, scale: 0.9 },
      animate: { opacity: 1, scale: 1 },
      transition: { duration: 0.4 }
    },
    staggerChildren: {
      container: { transition: { staggerChildren: 0.1 } },
      item: {
        initial: { opacity: 0, x: -20 },
        animate: { opacity: 1, x: 0 }
      }
    }
  },
  hover: {
    lift: {
      scale: 1.02,
      y: -4,
      transition: { duration: 0.2 }
    },
    glow: {
      boxShadow: '0 0 8px rgba(0,0,0,0.2)',
      transition: { duration: 0.2 }
    }
  },
  scroll: {
    parallax: {
      y: [-20, 20],
      transition: { duration: 1 }
    },
    reveal: {
      opacity: [0, 1],
      y: [50, 0],
      transition: { duration: 0.8 }
    }
  }
};

const AnimationControls = ({ onApply }) => {
  return (
    <div className="animation-controls grid grid-cols-3 gap-4">
      {Object.entries(animationPresets).map(([category, animations]) => (
        <div key={category} className="animation-category">
          <h3 className="text-lg font-semibold mb-3 capitalize">{category}</h3>
          <div className="space-y-2">
            {Object.entries(animations).map(([name, props]) => (
              <button
                key={name}
                onClick={() => onApply(category, name, props)}
                className="w-full p-2 bg-white rounded shadow hover:shadow-md transition-shadow"
              >
                {name}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AnimationControls;
