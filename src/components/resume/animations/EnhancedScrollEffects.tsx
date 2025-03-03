import { motion, useViewportScroll, useTransform, useSpring } from 'framer-motion';
import { useRef, useState } from 'react';

const EnhancedScrollEffects = () => {
  const { scrollYProgress } = useViewportScroll();
  const smoothProgress = useSpring(scrollYProgress);
  
  return (
    <div className="enhanced-scroll-container">
      <ParallaxGallery smoothProgress={smoothProgress} />
      <InteractiveSections />
      <ScrollBasedTransforms />
      <DynamicBackground scrollProgress={scrollYProgress} />
    </div>
  );
};

const ParallaxGallery = ({ smoothProgress }) => {
  const items = [
    { depth: 0.2, color: 'blue' },
    { depth: 0.4, color: 'green' },
    { depth: 0.6, color: 'red' },
    { depth: 0.8, color: 'purple' }
  ];

  return (
    <div className="relative h-screen overflow-hidden">
      {items.map((item, index) => (
        <motion.div
          key={index}
          style={{
            y: useTransform(smoothProgress, [0, 1], [0, item.depth * 1000]),
            scale: useTransform(smoothProgress, [0, 0.5, 1], [1, 1 + item.depth, 1])
          }}
          className={`absolute inset-0 bg-${item.color}-500 opacity-75`}
        />
      ))}
    </div>
  );
};

const InteractiveSections = () => {
  const [activeSection, setActiveSection] = useState(null);
  
  return (
    <div className="space-y-12">
      {['skills', 'experience', 'projects'].map((section) => (
        <motion.section
          key={section}
          whileHover={{ scale: 1.02 }}
          onHoverStart={() => setActiveSection(section)}
          onHoverEnd={() => setActiveSection(null)}
          className="p-8 rounded-lg shadow-lg"
        >
          <motion.h2
            animate={{
              scale: activeSection === section ? 1.1 : 1,
              color: activeSection === section ? '#3B82F6' : '#1F2937'
            }}
            className="text-2xl font-bold"
          >
            {section.toUpperCase()}
          </motion.h2>
        </motion.section>
      ))}
    </div>
  );
};

const ScrollBasedTransforms = () => {
  const containerRef = useRef(null);
  const { scrollYProgress } = useViewportScroll();
  
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1.5, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0.3, 1, 0.3]);

  return (
    <motion.div
      ref={containerRef}
      style={{ rotate, scale, opacity }}
      className="fixed top-4 right-4 w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
    />
  );
};

const DynamicBackground = ({ scrollProgress }) => {
  const backgroundColor = useTransform(
    scrollProgress,
    [0, 0.25, 0.5, 0.75, 1],
    [
      'rgb(255, 255, 255)',
      'rgb(240, 249, 255)',
      'rgb(219, 234, 254)',
      'rgb(191, 219, 254)',
      'rgb(147, 197, 253)'
    ]
  );

  return (
    <motion.div
      style={{ backgroundColor }}
      className="fixed inset-0 -z-10 transition-colors duration-300"
    />
  );
};

export default EnhancedScrollEffects;
