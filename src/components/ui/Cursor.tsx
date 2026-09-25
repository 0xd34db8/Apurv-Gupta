import { useEffect, useState } from "react";

interface CursorProps {
  normalCursor: string;
  linkCursor: string;
  size?: number; // (px)
}

const CustomCursor: React.FC<CursorProps> = ({
  normalCursor,
  linkCursor,
  size = 32,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLinkHover, setIsLinkHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice] = useState(
    () =>
      typeof window !== "undefined" &&
      ("ontouchstart" in window || navigator.maxTouchPoints > 0)
  );

  useEffect(() => {
    // If it's a touch device, don't attach mouse listeners
    if (isTouchDevice) return;

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button") !== null) {
        setIsLinkHover(true);
      }
    };
    const handleMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button") !== null) {
        setIsLinkHover(false);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
    };
  }, [isVisible]);

  // If it's a touch device, return null so no div is rendered
  if (isTouchDevice) return null;

  return (
    <div
      style={{
        position: "fixed",
        left: position.x,
        top: position.y,
        width: size,
        height: size,
        pointerEvents: "none",
        zIndex: 9999,
        backgroundImage: `url(${isLinkHover ? linkCursor : normalCursor})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "contain",
        transition: "background-image 0.1s ease, opacity 0.2s ease",
        opacity: isVisible ? 1 : 0,
      }}
    />
  );
};

export default CustomCursor;
