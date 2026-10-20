import { motion } from "framer-motion";

interface WireframeOverlayProps {
  src: string;
  alt?: string;
  className?: string;
  color?: string;
  opacity?: number;
  large?: boolean;
}

export default function WireframeOverlay({
  src,
  alt = "Wireframe",
  className = "",
  color = "#1313F5",
  opacity = 0.35,
  large = false,
}: WireframeOverlayProps) {
  if (large) {
    return (
      <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center">
        <div className="relative w-full max-w-5xl flex items-center justify-center">
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
    <div className="absolute inset-0 z-0 pointer-events-none flex items-center justify-center overflow-hidden">
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
