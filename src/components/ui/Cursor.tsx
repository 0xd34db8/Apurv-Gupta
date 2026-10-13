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

    const checkInteractive = (target: EventTarget | null) => {
      if (!target || !(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          "a, button, [role='button'], .cursor-pointer, input[type='button'], input[type='submit']"
        )
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      setIsVisible(true);
      setIsLinkHover(checkInteractive(e.target));
    };

    const handleMouseOver = (e: MouseEvent) => {
      setIsLinkHover(checkInteractive(e.target));
    };

    const handleMouseOut = (e: MouseEvent) => {
      const related = e.relatedTarget as Element | null;
      setIsLinkHover(checkInteractive(related));
    };

    const handleClick = (e: MouseEvent) => {
      const recheck = () => {
        const el = document.elementFromPoint(e.clientX, e.clientY);
        setIsLinkHover(checkInteractive(el));
      };
      requestAnimationFrame(recheck);
      setTimeout(recheck, 50);
      setTimeout(recheck, 150);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
      setIsLinkHover(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", handleMouseOut);
    window.addEventListener("click", handleClick);
    window.addEventListener("pointerup", handleClick);
    document.documentElement.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", handleMouseOut);
      window.removeEventListener("click", handleClick);
      window.removeEventListener("pointerup", handleClick);
      document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isTouchDevice]);

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
