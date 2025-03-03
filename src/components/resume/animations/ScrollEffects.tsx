import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

const ScrollEffects = () => {
  return (
    <div className="space-y-24">
      <FadeInSection />
      <ScaleSection />
      <RotateSection />
      <BlurSection />
      <ColorTransitionSection />
    </div>
  );
};

const FadeInSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.3 });

  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.8 }}
      className="p-8 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Experience</h2>
      {/* Content */}
    </motion.section>
  );
};

const ScaleSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  return (
    <motion.section
      ref={ref}
      initial={{ scale: 0.8 }}
      animate={isInView ? { scale: 1 } : { scale: 0.8 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      className="p-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      {/* Content */}
    </motion.section>
  );
};

const RotateSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.4 });

  return (
    <motion.section
      ref={ref}
      initial={{ rotateX: 45, opacity: 0 }}
      animate={isInView ? { rotateX: 0, opacity: 1 } : { rotateX: 45, opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="p-8 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      {/* Content */}
    </motion.section>
  );
};

const BlurSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.6 });

  return (
    <motion.section
      ref={ref}
      initial={{ filter: "blur(12px)", opacity: 0 }}
      animate={isInView ? { filter: "blur(0px)", opacity: 1 } : { filter: "blur(12px)", opacity: 0 }}
      transition={{ duration: 0.8 }}
      className="p-8 bg-white rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Education</h2>
      {/* Content */}
    </motion.section>
  );
};

const ColorTransitionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.7 });

  return (
    <motion.section
      ref={ref}
      initial={{ backgroundColor: "#ffffff" }}
      animate={isInView ? { backgroundColor: "#f0f9ff" } : { backgroundColor: "#ffffff" }}
      transition={{ duration: 1 }}
      className="p-8 rounded-lg shadow-lg"
    >
      <h2 className="text-2xl font-bold mb-4">Awards</h2>
      {/* Content */}
    </motion.section>
  );
};

export default ScrollEffects;
