import React, { useEffect, useState, useRef, useCallback } from "react";

interface CursorProps {
  normalCursor: string;
  linkCursor: string;
  normalCur?: string;
  linkCur?: string;
  size?: number; // (px)
}

type CursorMode = "checking" | "custom" | "fallback" | "touch";

const applyNativeCurStyles = (normalCur: string, linkCur: string) => {
  let styleEl = document.getElementById(
    "native-cursor-fallback-styles"
  ) as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement("style");
    styleEl.id = "native-cursor-fallback-styles";
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `
    html.native-cursor-fallback,
    html.native-cursor-fallback body,
    html.native-cursor-fallback * {
      cursor: url("${normalCur}") 5 2, url("/Cursor/normal.cur") 5 2, auto !important;
    }
    html.native-cursor-fallback a,
    html.native-cursor-fallback button,
    html.native-cursor-fallback [role="button"],
    html.native-cursor-fallback .cursor-pointer,
    html.native-cursor-fallback input[type="button"],
    html.native-cursor-fallback input[type="submit"] {
      cursor: url("${linkCur}") 5 2, url("/Cursor/link.cur") 5 2, pointer !important;
    }
  `;
};

const getInitialMode = (): CursorMode => {
  if (typeof window === "undefined") return "checking";
  try {
    if (localStorage.getItem("cursor_mode") === "fallback") {
      return "fallback";
    }
  } catch {
    // Ignore
  }
  if (window.matchMedia("(pointer: coarse) and (hover: none)").matches) {
    return "touch";
  }
  return "checking";
};

const CustomCursor: React.FC<CursorProps> = ({
  normalCursor,
  linkCursor,
  normalCur = "/Cursor/normal.cur",
  linkCur = "/Cursor/link.cur",
  size = 25,
}) => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isLinkHover, setIsLinkHover] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [mode, setMode] = useState<CursorMode>(getInitialMode);

  const cursorRef = useRef<HTMLDivElement>(null);
  const fallbackTriggeredRef = useRef(false);
  const hasMovedRef = useRef(false);

  const triggerFallback = useCallback(
    (reason: string) => {
      if (fallbackTriggeredRef.current) return;
      fallbackTriggeredRef.current = true;
      console.warn(`[Cursor] Switching to native .cur fallback: ${reason}`);

      try {
        localStorage.setItem("cursor_mode", "fallback");
      } catch {
        // Ignore localStorage quota or private browsing errors
      }

      document.documentElement.classList.remove("custom-cursor-active");
      document.documentElement.classList.add("native-cursor-fallback");
      applyNativeCurStyles(normalCur, linkCur);

      setMode("fallback");
    },
    [normalCur, linkCur]
  );

  const verifyImages = useCallback(async (): Promise<boolean> => {
    const testOne = (src: string): Promise<boolean> =>
      new Promise((resolve) => {
        const img = new Image();
        let settled = false;
        const done = (result: boolean) => {
          if (!settled) {
            settled = true;
            resolve(result);
          }
        };

        img.onload = () => {
          if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            if ("decode" in img && typeof img.decode === "function") {
              img.decode().then(() => done(true)).catch(() => done(false));
            } else {
              done(true);
            }
          } else {
            done(false);
          }
        };

        img.onerror = () => done(false);
        img.src = src;

        if (img.complete) {
          if (img.naturalWidth > 0 && img.naturalHeight > 0) {
            if ("decode" in img && typeof img.decode === "function") {
              img.decode().then(() => done(true)).catch(() => done(false));
            } else {
              done(true);
            }
          } else {
            done(false);
          }
        }
      });

    try {
      const [normalOk, linkOk] = await Promise.all([
        testOne(normalCursor),
        testOne(linkCursor),
      ]);
      return normalOk && linkOk;
    } catch {
      return false;
    }
  }, [normalCursor, linkCursor]);

  const verifyDomElement = useCallback((): boolean => {
    if (!cursorRef.current) return false;
    const el = cursorRef.current;
    if (!document.body.contains(el)) return false;
    const style = window.getComputedStyle(el);
    if (style.display === "none" || style.visibility === "hidden") return false;
    return true;
  }, []);

  // Initialization and detection effect
  useEffect(() => {
    if (mode === "fallback") {
      document.documentElement.classList.remove("custom-cursor-active");
      document.documentElement.classList.add("native-cursor-fallback");
      applyNativeCurStyles(normalCur, linkCur);
      return;
    }

    if (mode === "touch") {
      document.documentElement.classList.remove("custom-cursor-active");
      return;
    }

    // Mark custom cursor active on document
    document.documentElement.classList.add("custom-cursor-active");

    let isMounted = true;

    // Verify images can be loaded & decoded
    verifyImages().then((ok) => {
      if (!isMounted) return;
      if (!ok) {
        triggerFallback("png_image_load_failed");
      } else {
        requestAnimationFrame(() => {
          if (!isMounted) return;
          if (!verifyDomElement()) {
            triggerFallback("dom_element_verification_failed");
          } else {
            setMode("custom");
          }
        });
      }
    });

    // Watchdog timeout: if verification takes > 1200ms, fallback to native .cur
    const watchdog = setTimeout(() => {
      if (!isMounted) return;
      if (fallbackTriggeredRef.current) return;
      if (!verifyDomElement()) {
        triggerFallback("render_verification_timeout");
      }
    }, 1200);

    return () => {
      isMounted = false;
      clearTimeout(watchdog);
    };
  }, [mode, normalCur, linkCur, verifyImages, verifyDomElement, triggerFallback]);

  // Mouse tracking and interaction effect
  useEffect(() => {
    if (mode === "fallback" || mode === "touch") return;

    const checkInteractive = (target: EventTarget | null) => {
      if (!target || !(target instanceof Element)) return false;
      return Boolean(
        target.closest(
          "a, button, [role='button'], .cursor-pointer, input[type='button'], input[type='submit']"
        )
      );
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMovedRef.current) {
        hasMovedRef.current = true;
        if (!verifyDomElement()) {
          triggerFallback("cursor_element_missing_on_move");
          return;
        }
      }

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
  }, [mode, verifyDomElement, triggerFallback]);

  // Debug testing helpers on window
  useEffect(() => {
    // @ts-expect-error: window debug hook for testing cursor fallback
    window.__triggerCursorFallback = () => triggerFallback("manual_test");
    // @ts-expect-error: window debug hook for resetting cursor mode
    window.__resetCursorMode = () => {
      localStorage.removeItem("cursor_mode");
      window.location.reload();
    };

    return () => {
      // @ts-expect-error: clean up window debug hook
      delete window.__triggerCursorFallback;
      // @ts-expect-error: clean up window debug hook
      delete window.__resetCursorMode;
    };
  }, [triggerFallback]);

  if (mode === "fallback" || mode === "touch") {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      id="custom-cursor"
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
