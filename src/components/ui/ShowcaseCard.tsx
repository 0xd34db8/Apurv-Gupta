import { motion } from "framer-motion";

interface ShowcaseCardProps {
  title: string;
  description: string;
  tag: string;
  index?: number;
}

const ShowcaseCard = ({
  title,
  description,
  tag,
  index = 0,
}: ShowcaseCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.98 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{
        duration: 0.4,
        ease: [0.23, 1, 0.32, 1],
        delay: index * 0.03,
      }}
      whileTap={{ scale: 0.97 }}
      className="group relative bg-[#050a15] border border-white/10 p-4 md:p-8 rounded-lg md:rounded-xl backdrop-blur-md transition-all duration-500 hover:border-[hsl(220,100%,60%)]/30 w-full md:max-w-[350px] overflow-hidden"
    >
      <div className="absolute inset-0 bg-radial-at-t from-[hsl(220,100%,60%)]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div className="flex items-center gap-1.5 mb-2 md:mb-6">
        <span className="text-[8px] md:text-[10px] uppercase tracking-[0.15em] text-[hsl(220,100%,60%)]/80 font-mono font-bold">
          {tag}
        </span>
      </div>

      <h3 className="text-lg md:text-2xl font-light text-white mb-1 md:mb-3 tracking-tight group-hover:text-white transition-colors duration-300">
        {title}
      </h3>

      <p className="text-[11px] md:text-sm text-gray-400/80 leading-[1.4] md:leading-relaxed font-light line-clamp-3 md:line-clamp-none">
        {description}
      </p>

    </motion.div>
  );
};

export default ShowcaseCard;
