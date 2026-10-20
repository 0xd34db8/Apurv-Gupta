import { motion } from "framer-motion";

interface WireframeOverlayProps {
  src: string;
  alt?: string;
  className?: string;
  containerClassName?: string;
  color?: string;
  opacity?: number;
  custom?: boolean;
  size?: string;
}

export default function WireframeOverlay({
  src,
  alt = "Wireframe",
  className = "",
  containerClassName = "",
  color = "#1313F5",
  opacity = 0.35,
  custom = false,
  size = "w-[85%] sm:w-[90%] max-w-4xl",
}: WireframeOverlayProps) {
  if (custom) {
    return (
      <div className={`absolute inset-0 z-0 pointer-events-none flex items-center justify-center ${containerClassName}`}>
        <div className={`relative ${size} flex items-center justify-center`}>
          <img
            src={src}
            alt=""
            aria-hidden="true"
            className={`w-full h-auto object-contain opacity-0 pointer-events-none select-none ${className}`}
          />
          <motion.div
            role="img"
            aria-label={alt}
            initial={{ opacity: 0 }}
            whileInView={{ opacity }}
            transition={{ duration: 1.5 }}
            className={`absolute inset-0 ${className}`}
            style={{
              backgroundColor: color,
              backgroundClip: "content-box",
              WebkitMaskImage: `url("${src}")`,
              maskImage: `url("${src}")`,
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskPosition: "center",
              maskPosition: "center",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskOrigin: "content-box",
              maskOrigin: "content-box",
              WebkitMaskClip: "content-box",
              maskClip: "content-box",
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div className={`absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden ${containerClassName}`}>
      <div className={`w-full max-w-5xl h-full flex items-center justify-center ${className}`}>
        <motion.div
          role="img"
          aria-label={alt}
          initial={{ opacity: 0 }}
          whileInView={{ opacity }}
          transition={{ duration: 1.5 }}
          className="w-full h-full"
          style={{
            backgroundColor: color,
            WebkitMaskImage: `url("${src}")`,
            maskImage: `url("${src}")`,
            WebkitMaskRepeat: "no-repeat",
            maskRepeat: "no-repeat",
            WebkitMaskPosition: "center",
            maskPosition: "center",
            WebkitMaskSize: "contain",
            maskSize: "contain",
          }}
        />
      </div>
    </div>
  );
}
