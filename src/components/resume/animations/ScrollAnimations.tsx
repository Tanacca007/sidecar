import { motion, useViewportScroll, useTransform, useInView } from 'framer-motion';
import { useRef } from 'react';

const ScrollAnimations = () => {
  const { scrollYProgress } = useViewportScroll();
  
  return (
    <div className="scroll-animations">
      <ParallaxSection />
      <ScrollProgressBar progress={scrollYProgress} />
      <ScrollRevealSections />
      <ScrollTriggeredEffects />
    </div>
  );
};

const ParallaxSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref);
  
  return (
    <motion.section
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 0.8 }}
      className="parallax-section"
    >
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [0, -200]),
          scale: useTransform(scrollYProgress, [0, 1], [1, 1.2])
        }}
        className="parallax-element"
      />
    </motion.section>
  );
};

const ScrollRevealSections = () => {
  const sections = [
    { title: 'Experience', delay: 0 },
    { title: 'Education', delay: 0.2 },
    { title: 'Skills', delay: 0.4 },
    { title: 'Projects', delay: 0.6 }
  ];

  return (
    <div className="reveal-sections">
      {sections.map((section, index) => (
        <ScrollRevealItem
          key={index}
          title={section.title}
          delay={section.delay}
        />
      ))}
    </div>
  );
};

const ScrollRevealItem = ({ title, delay }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -50 }}
      animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
      transition={{ duration: 0.6, delay }}
      className="reveal-item"
    >
      <h3>{title}</h3>
    </motion.div>
  );
};

const ScrollTriggeredEffects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { amount: 0.5 });

  const variants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        staggerChildren: 0.1
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="scroll-triggered-container"
    >
      {Array.from({ length: 6 }).map((_, i) => (
        <motion.div
          key={i}
          variants={variants}
          className="triggered-item"
        />
      ))}
    </motion.div>
  );
};

export default ScrollAnimations;
