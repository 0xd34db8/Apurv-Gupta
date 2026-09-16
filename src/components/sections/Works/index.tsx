import { motion } from "framer-motion";
import StreakBurst from "../../ui/StreakBurst";
import WIREFRAME from "../../../assets/Wireframe.png";
import projects from "../../../data/projects.json";
import { DesktopProjectCard, MobileProjectCard } from "./ProjectCard";

export default function Works() {
  return (
    <section
      id="work"
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

      {/* CHARACTER OVERLAY */}
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <motion.img
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.35 }}
          transition={{ duration: 1.5 }}
          src={WIREFRAME}
          alt="Wireframe"
          className="w-full max-w-5xl object-contain brightness-150 contrast-125 md:pl-12 md:pt-70 pt-35"
        />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <h2 className="text-sm font-mono text-gray-500 uppercase mb-4 flex items-center gap-2">
          <span className="w-2 h-2 bg-blue-600 animate-pulse rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
          / Selected Projects
        </h2>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-[0.9] flex items-baseline mb-5 sm:mb-20">
          <StreakBurst
            text="Works"
            className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-100 to-white"
            delay={0.4}
          />
        </h1>

        {projects.map((exp, i) => (
          <div key={i}>
            <DesktopProjectCard exp={exp} index={i} />
            <MobileProjectCard exp={exp} index={i} />
          </div>
        ))}
      </div>
    </section>
  );
}
