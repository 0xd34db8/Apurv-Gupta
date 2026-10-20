import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

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
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16 bg-[#050a15] overflow-hidden border-t border-white/0"
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
            className="mb-10"
          >
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 border border-[hsl(220,100%,60%)] rotate-45 animate-[spin_10s_linear_infinite]" />
              <div className="absolute inset-2 border border-white/20 -rotate-45" />
              <div className="absolute inset-0 flex items-center justify-center font-mono text-xl font-bold text-white">
                AG
              </div>
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
