import { useState } from "react";
import StreakBurst from "../ui/StreakBurst";
import experienceData from "../../data/experience.json";
import TextType from "../ui/TextType";
import { motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ExperienceProps {
  exp: {
    role: string;
    company: string;
    duration: string;
    description: string[];
  };
  i: number;
}

const ExperienceCard = ({ exp, i }: ExperienceProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6, delay: i * 0.15 }}
      className="relative mb-12 last:mb-0 group"
    >
      <div
        className="relative p-6 sm:p-8 rounded-2xl bg-[#0d1117]/60 backdrop-blur-md border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden group-hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] cursor-pointer sm:cursor-default"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

        <div className={`relative z-10 flex flex-col md:flex-row md:justify-between md:items-start gap-4 ${isExpanded ? 'mb-6' : 'mb-0 sm:mb-6'}`}>
          <div className="max-w-2xl w-full">
            <div className="flex justify-between items-center w-full">
              <h3 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-blue-200 transition-all duration-300">
                <TextType
                  text={exp.role}
                  typingSpeed={3}
                  initialDelay={i * 200}
                  loop={false}
                  cursorCharacter="_"
                  cursorClassName="text-blue-500 ml-1"
                />
              </h3>
              <button
                className="sm:hidden text-gray-400 hover:text-white p-1"
                onClick={(e) => {
                  e.stopPropagation();
                  setIsExpanded(!isExpanded);
                }}
              >
                {isExpanded ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
              </button>
            </div>
            <p className={`mt-2 text-lg sm:text-xl font-mono text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-400 font-medium tracking-wide ${!isExpanded ? 'hidden sm:block' : 'block'}`}>
              {exp.company}
            </p>
          </div>

          <div className={`inline-flex items-center rounded-full border border-blue-500/20 bg-blue-500/10 px-4 py-1.5 text-sm font-mono text-blue-300 backdrop-blur-sm shadow-[0_0_15px_rgba(59,130,246,0.1)] group-hover:border-blue-500/40 group-hover:shadow-[0_0_25px_rgba(59,130,246,0.2)] transition-all duration-300 whitespace-nowrap self-start ${!isExpanded ? 'hidden sm:inline-flex' : 'inline-flex mt-2 sm:mt-0'}`}>
            {exp.duration}
          </div>
        </div>

        <div className={`relative z-10 ${!isExpanded ? 'hidden sm:block' : 'block mt-6'}`}>
          <ul className="space-y-4">
            {exp.description.map((desc: string, idx: number) => (
              <motion.li
                key={idx}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 + idx * 0.1 }}
                className="group/item flex items-start gap-4 text-gray-400 hover:text-gray-200 transition-colors duration-300"
              >
                <div className="mt-2 flex-shrink-0">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500/50 group-hover/item:bg-blue-400 group-hover/item:shadow-[0_0_10px_rgba(96,165,250,0.8)] group-hover/item:scale-125 transition-all duration-300" />
                </div>
                <span className="text-sm sm:text-base font-sans leading-relaxed">
                  {desc}
                </span>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default function WorkExperience() {
  return (
    <section
      id="experience"
      className="relative lg:py-24 sm:pt-20 px-4 sm:px-6 md:px-16 pb-20 bg-[#090b0e] overflow-hidden"
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

        <div className="relative border-l border-white/10 pl-6 sm:pl-10 ml-4 sm:ml-0 m-8 sm:mt-16">
          {experienceData.map((exp, i) => (
            <ExperienceCard key={i} exp={exp} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
