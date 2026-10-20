import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import StreakBurst from "../ui/StreakBurst";
import Spider from "../../assets/Wireframes/Spider.png";
import WireframeOverlay from "../ui/WireframeOverlay";
import skills from "../../data/skills.json";
import SkillGroup from "../ui/SkillGroup";

export default function Skills() {
  const [activeTab, setActiveTab] = useState<number>(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="skills"
      className="relative py-12 sm:py-16 md:py-24 px-4 sm:px-6 md:px-16 bg-[#0a0d12] overflow-hidden"
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
            "radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.05) 0%, transparent 60%, #0a0d12 100%)",
        }}
      />

      <div
        className="absolute inset-x-0 top-0 h-28 md:h-40 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to bottom, #0a0d12 0%, #0a0d12 30%, transparent 100%)",
        }}
      />

      <div
        className="absolute inset-x-0 bottom-0 h-28 md:h-40 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #090b0e 0%, #090b0e 20%, transparent 100%)",
        }}
      />

      {/* SPIDER OVERLAY */}
      <WireframeOverlay
        src={Spider}
        alt="Spider"
        className="md:pl-9 md:pt-9 pt-10"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 sm:mb-12 md:mb-20 gap-8">
          <div className="max-w-2xl">
            <h3 className="text-sm font-mono text-gray-500 uppercase mb-4 tracking-widest flex items-center gap-2">

              / Tech Stack
            </h3>
            <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] flex items-baseline">
              <StreakBurst
                text="Skillset"
                className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-100 to-white"
                delay={0.4}
              />
            </h2>
          </div>
        </div>

        <div className="block md:hidden">
          <div
            ref={scrollRef}
            className="flex overflow-x-auto no-scrollbar gap-2 mb-6 pb-2 -mx-2 px-2 snap-x"
          >
            {skills.map((group, i) => (
              <button
                key={i}
                onClick={() => setActiveTab(i)}
                className={`relative px-5 py-2.5 rounded-full border text-[11px] font-mono transition-all uppercase tracking-wider whitespace-nowrap snap-start flex-shrink-0 ${activeTab === i
                  ? "border-blue-500 text-white"
                  : "bg-white/5 border-white/10 text-gray-500"
                  }`}
              >
                {activeTab === i && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-blue-600/20 rounded-full -z-10 shadow-[0_0_15px_rgba(30,64,175,0.4)]"
                  />
                )}
                {group.category}
              </button>
            ))}
          </div>
          <div className="min-h-[230px] relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <SkillGroup
                  index={activeTab}
                  category={`<${skills[activeTab].category}>`}
                  items={skills[activeTab].items}
                />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-4">
          {skills.map((group, i) => (
            <div
              key={group.category}
              className={i === 0 ? "md:col-span-2" : ""}
            >
              <SkillGroup
                index={i}
                category={`<${group.category}>`}
                items={group.items}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
