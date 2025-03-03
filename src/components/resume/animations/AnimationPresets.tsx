const animationPresets = {
  sections: {
    cascadeIn: {
      initial: { opacity: 0, x: -50 },
      animate: { opacity: 1, x: 0 },
      transition: { type: "spring", stiffness: 100, damping: 12 }
    },
    expandFromCenter: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1 },
      transition: { type: "spring", bounce: 0.4 }
    },
    floatIn: {
      initial: { opacity: 0, y: 30 },
      animate: { opacity: 1, y: 0 },
      transition: { type: "tween", ease: "easeOut" }
    }
  },
  elements: {
    popIn: {
      initial: { scale: 0 },
      animate: { scale: 1 },
      transition: { type: "spring", stiffness: 400, damping: 10 }
    },
    shimmer: {
      animate: {
        background: ["linear-gradient(45deg, #f3f4f6 0%, #fff 50%, #f3f4f6 100%)"],
        backgroundSize: ["200% 100%"],
        backgroundPosition: ["100% 0%", "-100% 0%"]
      },
      transition: { duration: 1.5, repeat: Infinity }
    },
    pulse: {
      animate: {
        scale: [1, 1.05, 1],
        opacity: [1, 0.8, 1]
      },
      transition: { duration: 2, repeat: Infinity }
    }
  },
  interactions: {
    hover: {
      scale: 1.02,
      transition: { duration: 0.2 }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    },
    focus: {
      boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.5)",
      transition: { duration: 0.2 }
    }
  },
  page: {
    fadeInStagger: {
      initial: { opacity: 0 },
      animate: { opacity: 1 },
      transition: { staggerChildren: 0.1 }
    },
    slideUpStagger: {
      initial: { y: 20, opacity: 0 },
      animate: { y: 0, opacity: 1 },
      transition: { staggerChildren: 0.2 }
    }
  }
};

export default animationPresets;
