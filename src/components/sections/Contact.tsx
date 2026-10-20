import { motion } from "framer-motion";
import Footer from "../layout/Footer";
import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

export default function Contact() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // disable animations on mobile
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const titleVariants = {
    hidden: { y: "100%" },
    visible: {
      y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section
      id="contact"
      className="md:min-h-screen flex flex-col justify-between py-20 md:py-24 px-4 sm:px-6 md:px-16 relative overflow-hidden bg-[#050a15] text-white"
    >
      <div className="max-w-7xl w-full mx-auto relative z-10">
        <div className="flex flex-col md:flex-row md:items-end md:gap-12">
          {/* Title Group */}
          <div>
            <div className="overflow-hidden">
              <motion.h2
                initial={isMobile ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true }}
                variants={titleVariants}
                className="text-[15vw] md:text-[12vw] leading-[0.8] font-bold uppercase tracking-tighter"
              >
                Let's
              </motion.h2>
            </div>
            <div className="overflow-hidden">
              <motion.h2
                initial={isMobile ? "visible" : "hidden"}
                whileInView="visible"
                viewport={{ once: true }}
                variants={titleVariants}
                className="text-[15vw] md:text-[12vw] font-bold uppercase tracking-tighter italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20"
              >
                Connect
              </motion.h2>
            </div>
          </div>

          {/* Socials beside text */}
          <div className="flex flex-col gap-8 md:mb-60">
            <div className="mt-6 sm:mt-10 md:mt-0">
              <p className="text-gray-500 font-mono uppercase text-[10px] mb-4 sm:mb-6 tracking-widest">
                Socials
              </p>

              <div className="flex gap-4 md:gap-8 xl:gap-12">
                {[
                  {
                    href: "https://www.linkedin.com/in/apurv7gupta/",
                    label: "LinkedIn",
                    path: "M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.48 1.12 2.48 2.5zM0 8h5v16H0V8zm7.5 0h4.8v2.2h.1c.7-1.3 2.4-2.7 5-2.7 5.3 0 6.6 3.5 6.6 8V24h-5V16.6c0-1.8 0-4.1-2.5-4.1s-2.9 2-2.9 4V24h-5V8z",
                  },
                  {
                    href: "https://github.com/0xd34db8",
                    label: "GitHub",
                    path: "M12 .5C5.73.5.5 5.74.5 12.02c0 5.1 3.29 9.42 7.86 10.95.58.1.79-.25.79-.56v-2c-3.2.7-3.87-1.55-3.87-1.55-.53-1.34-1.3-1.7-1.3-1.7-1.06-.73.08-.72.08-.72 1.17.08 1.79 1.2 1.79 1.2 1.04 1.79 2.73 1.27 3.4.97.1-.75.4-1.27.73-1.56-2.55-.3-5.23-1.28-5.23-5.68 0-1.25.45-2.27 1.2-3.07-.12-.3-.52-1.52.12-3.17 0 0 .97-.31 3.18 1.18a11 11 0 0 1 5.8 0c2.2-1.49 3.18-1.18 3.18-1.18.64 1.65.24 2.87.12 3.17.75.8 1.2 1.82 1.2 3.07 0 4.42-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.15c0 .31.21.66.8.55 4.56-1.53 7.84-5.85 7.84-10.95C23.5 5.74 18.27.5 12 .5z",
                  },
                  {
                    href: "mailto:apurvgupta.2017@gmail.com",
                    label: "Email",
                    path: "M2 4h20v16H2V4zm10 7L4 6v12h16V6l-8 5z",
                  },
                ].map(({ href, label, path }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="
            flex items-center justify-center
            w-12 h-12
            md:w-20 md:h-20
            xl:w-24 xl:h-24
            rounded-xl
            border border-[hsl(220,100%,60%)]/20
            bg-[hsl(220,100%,60%)]/5
            text-gray-400
            backdrop-blur-sm
            transition-all duration-300
            hover:border-[hsl(220,100%,60%)]/40
            hover:text-[hsl(220,100%,60%)]
            hover:shadow-[0_0_30px_-6px_hsl(220,100%,60%)]
          "
                  >
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-5 h-5 md:w-9 md:h-9 xl:w-11 xl:h-11"
                    >
                      <path d={path} />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 sm:mt-12 md:mt-0 grid grid-cols-2 gap-4 items-center min-h-[90px] sm:min-h-[120px] md:min-h-0">
          <div className="space-y-12"></div>

          <div className="flex items-center justify-end">
            <a
              href="#home"
              aria-label="Back to top"
              onClick={(e) => {
                e.preventDefault();
                // @ts-expect-error: window.locomotiveScroll is not typed
                if (window.locomotiveScroll) window.locomotiveScroll.scrollTo("#home");
                else document.getElementById("home")?.scrollIntoView({ behavior: "smooth" });
                window.history.pushState(null, "", "#home");
              }}
              className="group relative"
            >
              <div
                className="
                  w-20 h-20 sm:w-24 sm:h-24 md:w-36 md:h-36
                  rounded-full
                  border border-blue-500/30 hover:border-blue-400/60
                  bg-[hsl(220,100%,60%)]/5 hover:bg-[hsl(220,100%,60%)]/15
                  backdrop-blur-md
                  shadow-[0_0_20px_rgba(59,130,246,0.12)] hover:shadow-[0_0_35px_rgba(59,130,246,0.35)]
                  flex flex-col items-center justify-center gap-1 md:gap-2
                  cursor-pointer
                  transition-all duration-500
                  hover:scale-105 active:scale-95
                  relative overflow-hidden
                "
              >
                {/* Subtle sheen on hover */}
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

                {/* Arrow Icon */}
                <ArrowUp
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4 md:w-6 md:h-6 text-blue-400 group-hover:text-white transition-all duration-300 group-hover:-translate-y-1"
                  strokeWidth={2}
                />

                {/* Text */}
                <span className="font-mono text-[8px] sm:text-[9px] md:text-xs uppercase tracking-[0.2em] text-gray-300 group-hover:text-white transition-colors duration-300 text-center leading-tight">
                  Back <br /> To Top
                </span>

                {/* Outer accent ring */}
                <div className="absolute inset-0 rounded-full border border-blue-400/20 group-hover:border-blue-400/50 group-hover:scale-105 transition-all duration-500 pointer-events-none" />
              </div>
            </a>
          </div>
        </div>
      </div>

      <Footer />

      <div className="absolute -bottom-20 -right-20 w-[60vw] h-[40vw] bg-blue-700 rounded-full blur-[100px] opacity-20 pointer-events-none hidden sm:block" />
    </section>
  );
}
