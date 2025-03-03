import { motion, useViewportScroll, useTransform, useMotionValue } from 'framer-motion';

const InteractiveAnimations = () => {
  const { scrollYProgress } = useViewportScroll();
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.2]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);

  return (
    <div className="interactive-animations">
      <GestureAnimations />
      <ScrollAnimations progress={scrollYProgress} scale={scale} rotate={rotate} />
      <DragAnimations />
      <HoverEffects />
    </div>
  );
};

const GestureAnimations = () => {
  return (
    <motion.div
      className="gesture-container"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      drag
      dragConstraints={{ left: 0, right: 0, top: 0, bottom: 0 }}
      dragElastic={0.2}
    >
      <motion.div
        className="gesture-element"
        animate={{
          rotate: [0, 90, 180, 270, 360],
          borderRadius: ["0%", "50%", "0%"]
        }}
        transition={{
          duration: 2,
          ease: "easeInOut",
          times: [0, 0.2, 0.5, 0.8, 1],
          repeat: Infinity,
          repeatDelay: 1
        }}
      />
    </motion.div>
  );
};

const ScrollAnimations = ({ progress, scale, rotate }) => {
  return (
    <motion.div
      className="scroll-container"
      style={{
        scale,
        rotate,
        opacity: progress
      }}
    >
      <ParallaxSection />
      <RevealOnScroll />
      <ProgressIndicator progress={progress} />
    </motion.div>
  );
};

const DragAnimations = () => {
  const x = useMotionValue(0);
  const rotateY = useTransform(x, [-200, 200], [-45, 45]);

  return (
    <motion.div
      drag="x"
      dragConstraints={{ left: -200, right: 200 }}
      style={{ x, rotateY }}
      className="drag-container"
    >
      <motion.div
        className="drag-element"
        animate={{
          boxShadow: [
            "0px 0px 0px rgba(0,0,0,0.2)",
            "0px 10px 20px rgba(0,0,0,0.4)",
            "0px 0px 0px rgba(0,0,0,0.2)"
          ]
        }}
        transition={{
          duration: 2,
          repeat: Infinity
        }}
      />
    </motion.div>
  );
};

const HoverEffects = () => {
  return (
    <div className="hover-effects-grid">
      {Array.from({ length: 9 }).map((_, i) => (
        <motion.div
          key={i}
          className="hover-item"
          whileHover={{
            scale: 1.1,
            rotate: Math.random() * 20 - 10,
            zIndex: 1
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15
          }}
        />
      ))}
    </div>
  );
};

export default InteractiveAnimations;
