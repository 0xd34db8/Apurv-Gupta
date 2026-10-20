import { motion } from "framer-motion";
import VScode from "../VScode";
import Flowchart from "../ui/Flowchart";

const Philosophy = () => {
  // Animation Variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  const lineGrow = {
    hidden: { scaleX: 0, opacity: 0 },
    visible: {
      scaleX: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut" },
    },
  };

  const lineGrowVertical = {
    hidden: { scaleY: 0, opacity: 0 },
    visible: {
      scaleY: 1,
      opacity: 1,
      transition: { duration: 1.2, ease: "easeInOut", delay: 0.2 },
    },
  };

  return (
    <section className="relative w-full min-h-screen bg-[#050a15] text-white py-24 md:py-24 px-4 sm:px-6 md:px-16 overflow-hidden">
      {/* Top Horizontal Line - Animates from center out */}
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.5 }}
        variants={lineGrow}
        className="hidden lg:block absolute top-20 left-1/2 -translate-x-1/2 w-full max-w-6xl h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"
      />

      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-0 mx-auto">
        {/* Left Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: { transition: { staggerChildren: 0.2 } },
          }}
          className="lg:pr-16 lg:py-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl lg:text-4xl font-medium mb-6"
          >
            The Reason I code
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-zinc-400 text-lg leading-relaxed max-w-md"
          >
            I like to play with fundamental building blocks of computer software
            and make something useful for myself.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="hidden lg:block mt-12 w-full h-auto lg:h-[600px] aspect-video rounded-lg overflow-hidden border border-zinc-800 shadow-2xl"
          >
            <VScode />
          </motion.div>
        </motion.div>

        {/* Vertical Separator Line */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={lineGrowVertical}
          className="hidden lg:block absolute left-1/2 top-0.5 bottom-10 w-[1px] bg-gradient-to-b from-transparent via-white to-transparent origin-top"
        />

        {/* Right Column */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            visible: {
              transition: { staggerChildren: 0.2, delayChildren: 0.3 },
            },
          }}
          className="lg:pl-16 lg:py-12"
        >
          <motion.h2
            variants={fadeInUp}
            className="text-3xl lg:text-4xl font-medium mb-6"
          >
            My execution Strategy
          </motion.h2>

          <motion.p
            variants={fadeInUp}
            className="text-zinc-400 text-lg leading-relaxed max-w-md"
          >
            I construct rapid digital architectures, deploy viable packages,
            refine relentlessly, mechanize every process, and defer enhancement.
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="w-full aspect-square mx-auto"
          >
            <Flowchart />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Philosophy;
