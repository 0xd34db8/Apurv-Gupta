import { useState } from "react";
import { motion } from "framer-motion";
import TextType from "../../ui/TextType";

export function DesktopProjectCard({ exp, index }: { exp: any; index: number }) {
  const [activeImg, setActiveImg] = useState(0);

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -100 : 100 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ type: "spring", bounce: 0.4, duration: 0.8 }}
      className={`hidden xl:flex group border-b border-white/5 py-12 md:py-20 flex-col gap-12 xl:gap-16 hover:bg-blue-500/[0.01] transition-all duration-500 items-center ${index % 2 === 0 ? "xl:flex-row" : "xl:flex-row-reverse"}`}
    >
      {/* Left/Right Text Column */}
      <div className="w-full xl:w-1/3 flex flex-col gap-6">
        <span className="text-blue-500/70 font-mono text-sm tracking-widest">
          00{index + 1}
        </span>

        <h3 className="text-3xl sm:text-4xl md:text-5xl font-medium flex flex-wrap relative group-hover:text-white transition-all duration-300 group-hover:[text-shadow:0_0_25px_rgba(0,102,255,0.6)]">
          <TextType
            text={exp.Name}
            typingSpeed={30}
            initialDelay={index * 200}
            loop={false}
            cursorCharacter="_"
            cursorClassName="text-[hsl(220,100%,60%)] ml-1"
          />
        </h3>

        <p className="text-gray-500 uppercase tracking-widest text-xs sm:text-sm font-mono leading-relaxed">
          {exp.desc}
        </p>

        <div className="flex flex-wrap gap-2 mt-2">
          {exp.tech.split("•").map((t: string, i: number) => (
            <span
              key={i}
              className="text-[10px] sm:text-xs font-mono text-gray-500 border border-white/10 px-2 py-1 rounded transition-colors group-hover:border-blue-500/30 group-hover:text-blue-400"
            >
              {t.trim()}
            </span>
          ))}
        </div>

        <div className="mt-4">
          {exp.link ? (
            <a
              href={exp.link}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm sm:text-base text-blue-500/70 hover:text-blue-400 transition-colors flex items-center gap-2 uppercase tracking-widest"
            >
              VIEW {exp.link_name} <span className="text-lg">↗</span>
            </a>
          ) : (
            <span className="opacity-0">None</span>
          )}
        </div>
      </div>

      {/* Right Column */}
      <div className="w-full xl:w-2/3 flex flex-col gap-4">
        {/* Main Image */}
        {exp.images && exp.images.length > 0 && (
          <div className="w-full aspect-[16/9] sm:aspect-video rounded-xl overflow-hidden border border-white/10 bg-white/5 relative group/mainImg">
            <img
              src={exp.images[activeImg]}
              alt={`${exp.Name} preview`}
              className="w-full h-full object-cover transition-transform duration-700 group-hover/mainImg:scale-[1.02]"
            />
            {/* Open full screen button */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover/mainImg:opacity-100 transition-opacity duration-300 flex items-end justify-end p-4">
              <button
                onClick={() => window.open(exp.images[activeImg], "_blank")}
                className="bg-blue-600/20 backdrop-blur-md p-2.5 rounded-lg border border-white/20 hover:bg-white/20 transition-all cursor-pointer"
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}

        {/* Thumbnails */}
        {exp.images && exp.images.length > 1 && (
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide snap-x">
            {exp.images.map((img: string, imgIdx: number) => (
              <button
                key={imgIdx}
                onClick={() => setActiveImg(imgIdx)}
                className={`relative w-24 sm:w-32 aspect-video flex-shrink-0 rounded-lg overflow-hidden border transition-all snap-center ${activeImg === imgIdx
                  ? "border-blue-500 opacity-100 ring-1 ring-blue-500/50"
                  : "border-white/10 opacity-50 hover:opacity-100 hover:border-white/30"
                  }`}
              >
                <img
                  src={img}
                  alt={`${exp.Name} thumb ${imgIdx + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export function MobileProjectCard({ exp, index }: { exp: any; index: number }) {
  return (
    <div className="xl:hidden group border-b border-white/5 py-8 sm:py-12 flex flex-col gap-4 hover:bg-blue-500/[0.01] transition-all duration-500">
      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
        <div className="max-w-full">
          <h3 className="text-3xl sm:text-4xl md:text-6xl font-medium flex flex-wrap relative group-hover:text-white transition-all duration-300 group-hover:[text-shadow:0_0_25px_rgba(0,102,255,0.6)]">
            <TextType
              text={exp.Name}
              typingSpeed={3}
              initialDelay={index * 200}
              loop={false}
              cursorCharacter="_"
              cursorClassName="text-[hsl(220,100%,60%)] ml-1"
            />
          </h3>
          <p className="text-gray-500 mt-5 uppercase tracking-widest text-xs sm:text-sm font-mono">
            {exp.desc}
          </p>
        </div>

        <div className="text-left md:text-right">
          <p className="font-mono text-base sm:text-lg md:text-xl text-blue-500/70 hover:text-blue-400 transition-colors">
            {exp.link ? (
              <a href={exp.link} target="_blank" rel="noopener noreferrer">
                {exp.link_name}
              </a>
            ) : (
              <span className="opacity-0">None</span>
            )}
          </p>

          <p className="max-w-xs sm:max-w-sm md:max-w-md text-[10px] sm:text-xs font-mono mt-1 text-gray-600 transition-all duration-300 group-hover:text-blue-400">
            {exp.tech}
          </p>
        </div>
      </div>
      {exp.images && exp.images.length > 0 && (
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 mt-4 scrollbar-hide snap-x snap-mandatory">
          {exp.images.map((img: string, imgIdx: number) => (
            <motion.div
              key={imgIdx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * imgIdx }}
              className="relative w-[65vw] sm:w-[320px] aspect-video flex-shrink-0 rounded-xl overflow-hidden border border-white/10 bg-white/5 group/img snap-center sm:snap-align-none"
            >
              <img
                src={img}
                alt={`${exp.Name} preview ${imgIdx + 1}`}
                className="w-full h-full object-cover transition-transform duration-500 group-hover/img:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent md:opacity-0 md:group-hover/img:opacity-100 transition-opacity duration-300 flex items-end justify-end p-2 sm:p-4">
                <button
                  onClick={() => window.open(img, "_blank")}
                  className="bg-blue-600/20 backdrop-blur-md p-2 sm:p-2.5 rounded-lg border border-white/20 active:scale-95 md:hover:bg-white/20 transition-all cursor-pointer"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
