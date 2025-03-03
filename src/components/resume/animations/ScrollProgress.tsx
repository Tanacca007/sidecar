import { motion, useViewportScroll, useTransform } from 'framer-motion';

const ScrollProgress = () => {
  const { scrollYProgress } = useViewportScroll();
  
  return (
    <div className="fixed top-0 left-0 right-0 h-1 z-50">
      <motion.div
        className="h-full bg-blue-600"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />
      
      <motion.div
        className="fixed right-4 bottom-4 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center"
        style={{
          rotate: useTransform(scrollYProgress, [0, 1], [0, 360]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.2, 1])
        }}
      >
        <motion.span
          className="text-blue-600 font-bold"
          style={{
            opacity: useTransform(scrollYProgress, [0, 1], [0.5, 1])
          }}
        >
          {Math.round(useTransform(scrollYProgress, [0, 1], [0, 100]).get())}%
        </motion.span>
      </motion.div>
    </div>
  );
};
