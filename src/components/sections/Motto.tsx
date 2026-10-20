import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Portrait from "../../assets/Portrait.png";

export default function Motto() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xPos = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const xPosReverse = useTransform(scrollYProgress, [0, 1], [-500, 0]);

  return (
    <section
      ref={containerRef}
      className="relative py-24 md:py-24 px-4 sm:px-6 md:px-16 bg-[#050a15] overflow-hidden border-t border-white/0"
    >
      <div className="absolute inset-0 flex flex-col justify-center gap-4 opacity-[0.02] pointer-events-none select-none">
        <motion.div
          style={{ x: xPos }}
          className="whitespace-nowrap text-[15vh] font-bold leading-none"
        >
          SYSTEMS ARCHITECTURE • DISTRIBUTED NETWORKS • CLOUD EFFICIENCY •
        </motion.div>
        <motion.div
          style={{ x: xPosReverse }}
          className="whitespace-nowrap text-[15vh] font-bold leading-none italic"
        >
          STRUCTURAL INTEGRITY • SCALABLE SOLUTIONS • HIGH THROUGHPUT •
        </motion.div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="mb-12 sm:mb-14"
          >
            <div className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-44 md:h-44 group">
              {/* Ambient radial blur glow */}
              <div className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-tr from-blue-600/30 via-blue-400/20 to-transparent blur-2xl pointer-events-none animate-pulse" />

              {/* Circular portrait container */}
              <div className="relative w-full h-full rounded-full overflow-hidden shadow-[0_0_35px_rgba(59,130,246,0.25)] group-hover:shadow-[0_0_50px_rgba(59,130,246,0.45)] transition-all duration-500 bg-[#050a15]">
                <img
                  src={Portrait}
                  alt="Apurv Gupta"
                  className="w-full h-full object-cover select-none pointer-events-none transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              {/* Outer orbital ring snapping to image border */}
              <div className="absolute inset-0 rounded-full border border-white/30 group-hover:border-blue-500/50 animate-[spin_28s_linear_infinite_reverse] pointer-events-none transition-colors duration-500" />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-3xl"
          >
            <h2 className="text-2xl md:text-4xl font-light tracking-tight text-gray-400 leading-relaxed">
              “Code is the <span className="text-white">architecture</span> of
              logic, designed to endure the{" "}
              <span className="text-white">entropy</span> of scale.”
            </h2>

            <div className="mt-8 flex items-center justify-center gap-4">
              <div className="h-[1px] w-12 bg-gradient-to-r from-transparent to-[hsl(220,100%,60%)]" />
              <span className="font-mono text-[10px] uppercase tracking-[0.4em] text-[hsl(220,100%,60%)]">
                Apurv Gupta / 2026
              </span>
              <div className="h-[1px] w-12 bg-gradient-to-l from-transparent to-[hsl(220,100%,60%)]" />
            </div>
          </motion.div>
        </div>
      </div>

      {/* <div className="absolute -bottom-20 -right-20 w-[60vw] h-[60vw] bg-blue-700 rounded-full blur-[100px] opacity-20 pointer-events-none hidden sm:block" /> */}
    </section>
  );
}
