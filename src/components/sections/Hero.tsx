import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import GlowButton from "../ui/Buttons/GlowButton";
import WhiteButton from "../ui/Buttons/WhiteButton";
import StreakBurst from "../ui/StreakBurst";

interface HeroProps {
  startAnimation?: boolean;
}

export default function Hero({ startAnimation = true }: HeroProps) {
  const { scrollYProgress } = useScroll();

  const [isMobile, setIsMobile] = useState(
    typeof window !== "undefined" && window.innerWidth < 768,
  );

  useEffect(() => {
    const onResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.6,
  });

  const LOAD_OFFSET = isMobile ? 20 : 60;
  const MOVE_RANGE = isMobile ? 40 : 120;

  const greetingX = useTransform(smoothProgress, [0, 0.3], [0, -MOVE_RANGE]);
  const nameX = useTransform(smoothProgress, [0, 0.3], [0, MOVE_RANGE]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { x: -24, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.section
      id="home"
      initial="hidden"
      animate={startAnimation ? "visible" : "hidden"}
      variants={containerVariants}
      className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 overflow-x-hidden"
    >
      {/* Background glow */}
      <div className="absolute top-1/4 -left-10 w-[60vw] md:w-[30vw] h-[60vw] md:h-[30vw] bg-[hsl(220,100%,15%)] rounded-full blur-[80px] md:blur-[120px] opacity-20 pointer-events-none" />

      <div className="max-w-7xl w-full mx-auto pt-20 md:pt-10 z-10">
        {/* Status */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap items-center gap-3 mb-8 md:mb-6"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-[hsl(220,100%,60%)]/20 bg-[hsl(220,100%,60%)]/5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[hsl(220,100%,60%)] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[hsl(220,100%,60%)]" />
            </span>
            <p className="text-[hsl(220,100%,60%)] font-mono text-[10px] uppercase tracking-widest">
              Available for Hire
            </p>
          </div>
          <p className="text-gray-500 font-mono text-[10px] uppercase tracking-widest">
            Based in Varanasi
          </p>
        </motion.div>

        {/* Title */}
        <motion.h1
          variants={itemVariants}
          className="text-[14vw] md:text-[12vw] leading-[0.9] md:leading-[0.8] font-bold uppercase tracking-tighter mb-8 md:mb-4"
        >
          <motion.span
            initial={{ x: LOAD_OFFSET, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: greetingX }}
            className="inline-block font-light bg-linear-to-r from-gray-500 via-white to-gray-500 bg-clip-text text-transparent"
          >
            Hey, I’m
          </motion.span>

          <br />

          <motion.span
            initial={{ x: -LOAD_OFFSET, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            style={{ x: nameX }}
            className="inline-block md:block whitespace-nowrap bg-linear-to-r from-white via-gray-400 to-white bg-clip-text text-transparent font-light md:text-right"
          >
            Apurv Gupta
          </motion.span>
        </motion.h1>

        {/* Subtitle */}
        <motion.h3
          variants={itemVariants}
          className="text-left md:text-center text-gray-400 text-lg md:text-2xl font-light max-w-2xl mb-10 md:mb-12 leading-relaxed"
        >
          I design <span className="text-white"> scalable systems</span>{" "}
          optimized for performance, cost, and long-term reliability.
        </motion.h3>

        {/* CTA + Focus */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
          <motion.div
            variants={itemVariants}
            className="lg:col-span-8 order-2 lg:order-1"
          >
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a href="https://docs.google.com/document/d/1mYTdEVDyZMmXxMx7vwNjd6SRd24S4fQJEQdFvcjez1E/edit?usp=sharing" target="_blank" rel="noopener noreferrer">
                <GlowButton label="RESUME" />
              </a>
              <a href="https://github.com/Apurv7Gupta/" target="_blank" rel="noopener noreferrer">
                <WhiteButton label="Source Code / GitHub" />
              </a>
            </div>
          </motion.div>

          <motion.div
            variants={itemVariants}
            className="lg:col-span-4 flex flex-col justify-end order-1 lg:order-2"
          >
            <div className="border-l border-white/10 pl-6 md:pl-8 py-2">
              <div className="text-gray-500 text-xs font-mono uppercase tracking-tighter mb-4">
                {"< "} Professional Focus {" >"}
              </div>
              <ul className="grid gap-6 text-[10px] md:text-sm text-gray-400 uppercase tracking-[0.2em] font-medium overflow-hidden">
                {["AI/ML", "Full-Stack Development", "C++ Development"].map(
                  (label, i) => (
                    <li
                      key={label}
                      className="flex items-center gap-2 hover:text-[hsl(220,100%,60%)] transition-colors cursor-default group overflow-hidden"
                    >
                      <span className="w-4 h-px bg-white/20 group-hover:bg-[hsl(220,100%,60%)] transition-colors" />
                      <StreakBurst text={label} delay={1.2 + i * 0.1} playAnimation={startAnimation} />
                    </li>
                  ),
                )}
              </ul>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Sidebar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={startAnimation ? { opacity: 1 } : {}}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute right-6 bottom-12 hidden xl:block"
      >
        <p className="rotate-90 origin-right text-[10px] font-mono text-gray-700 uppercase tracking-[1em]">
          Scroll to Explore / 2026 Portfolio
        </p>
      </motion.div>
    </motion.section>
  );
}
