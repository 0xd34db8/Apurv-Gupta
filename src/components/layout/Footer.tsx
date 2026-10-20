import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

const Footer: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Check if mobile on mount
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    const checkVisibility = () => {
      const footer = document.getElementById("footer");
      if (!footer) return;

      const rect = footer.getBoundingClientRect();

      // If mobile, immediately visible
      if (rect.top <= window.innerHeight || window.innerWidth < 768) {
        setIsVisible(true);

        if (videoRef.current) {
          const video = videoRef.current;
          const freezeTime = 4.5;
          video.currentTime = freezeTime;
          video.play().catch(() => {});
          video.pause();
        }

        if (rect.top <= window.innerHeight) {
          window.removeEventListener("scroll", checkVisibility);
        }
      }
    };

    window.addEventListener("scroll", checkVisibility);
    window.addEventListener("resize", checkMobile);
    checkVisibility();

    return () => {
      window.removeEventListener("scroll", checkVisibility);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  return (
    <footer id="footer">
      <motion.div
        // If mobile: no initial hidden state, no animation
        initial={isMobile ? { opacity: 1 } : { opacity: 0 }}
        animate={isMobile ? { opacity: 1 } : isVisible ? { opacity: 1 } : {}}
        transition={{
          duration: isMobile ? 0 : 0.9,
          ease: [0.43, 0.13, 0.23, 0.96],
        }}
        className="absolute bottom-0 left-0"
      >
        <video
          ref={videoRef}
          src="/LOGO_old.webm"
          className="md:ml-30 mb-20 md:mb-0 h-32 sm:h-40 md:h-80 pointer-events-none z-0"
          muted
          playsInline
          preload="auto"
        />
      </motion.div>
    </footer>
  );
};

export default Footer;
