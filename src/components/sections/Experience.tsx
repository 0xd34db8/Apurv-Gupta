import StreakBurst from "../ui/StreakBurst";
import experienceData from "../../data/experience.json";
import TextType from "../ui/TextType";
import { motion } from "framer-motion";

export default function WorkExperience() {
  return (
    <section
      id="experience"
      className="relative lg:py-24 sm:pt-20 px-4 sm:px-6 md:px-16 bg-[#090b0e] overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 102, 255, 0.23) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 102, 255, 0.23) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 40%, transparent 90%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.05) 0%, transparent 60%, #090b0e 100%)",
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-24 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, #090b0e 0%, transparent 100%)",
        }}
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-sm font-mono text-gray-500 uppercase mb-4 sm:mb-4 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-blue-600 animate-pulse rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
          / Professional Journey
        </motion.h2>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none pb-4 flex items-baseline mb-5 sm:mb-20">
          <StreakBurst
            text="Experience"
            className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-100 to-white pb-2"
            delay={0.4}
          />
        </h1>

        {experienceData.map((exp, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="group border-b border-white/5 py-8 sm:py-12 flex flex-col gap-4 hover:bg-blue-500/[0.01] transition-all duration-500"
          >
            <div className="flex flex-col pb-15 md:pb-0  md:flex-row md:justify-between md:items-start gap-4">
              <div className="max-w-3xl">
                <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium flex flex-wrap relative group-hover:text-white transition-all duration-300 group-hover:[text-shadow:0_0_25px_rgba(0,102,255,0.6)]">
                  <TextType
                    text={exp.role}
                    typingSpeed={3}
                    initialDelay={i * 200}
                    loop={false}
                    cursorCharacter="_"
                    cursorClassName="text-[hsl(220,100%,60%)] ml-1"
                  />
                </h3>
                <p className="text-blue-500/80 mt-2 text-xl sm:text-2xl font-mono transition-colors">
                  {exp.company}
                </p>

                <ul className="mt-6 space-y-3">
                  {exp.description.map((desc, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: i * 0.15 + idx * 0.1, type: "spring", stiffness: 120, damping: 12 }}
                      className="text-gray-400 text-sm sm:text-base font-sans leading-relaxed flex items-start gap-3"
                    >
                      <span className="text-blue-500 mt-1.5 text-xs">▹</span>
                      <span>{desc}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>

              <div className="text-left md:text-right mt-4 md:mt-0 whitespace-nowrap">
                <p className="font-mono text-sm sm:text-base text-gray-500">
                  {exp.duration}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
