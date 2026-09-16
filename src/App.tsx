import { useState, useEffect } from "react";
import "./App.css";
import Curtain from "./components/ui/Curtain";
import Navbar from "./components/layout/Navbar";
import Hero from "./components/sections/Hero";
import Works from "./components/sections/Works";
import WorkExperience from "./components/sections/Experience";
import Skills from "./components/sections/Skills";
// import Blogs from "./components/sections/Blogs";
import BlogPost from "./components/sections/BlogPost";
import Contact from "./components/sections/Contact";
import Cursor from "./components/ui/Cursor";
import MottoSeparater from "./components/sections/Motto";
import Philosophy from "./components/sections/Philosophy";
import ShowcaseCard from "./components/ui/ShowcaseCard";
import ClickSpark from "./components/ui/ClickSpark";
import { Analytics } from "@vercel/analytics/react";
import LocomotiveScroll from "locomotive-scroll";

import CursorImgNormal from "./assets/Cursor/normal.png";
import CursorImgLink from "./assets/Cursor/link.png";

export default function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [introFinished, setIntroFinished] = useState(false);
  const [isLandingPage, setIsLandingPage] = useState(false);
  const [activeBlogId, setActiveBlogId] = useState<string | null>(null);

  const [hash, setHash] = useState(window.location.hash);

  useEffect(() => {
    const locomotiveScroll = new LocomotiveScroll({
      lerp: 0.1,
    });

    return () => {
      if (locomotiveScroll) locomotiveScroll.destroy();
    };
  }, []);

  useEffect(() => {
    const handleHashChange = () => setHash(window.location.hash);
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  useEffect(() => {
    const path = window.location.pathname + hash;

    // Check if it's a blog route
    if (hash.startsWith("#blog/")) {
      setActiveBlogId(hash.replace("#blog/", ""));
      setShowIntro(false);
      setIntroFinished(true);
      setIsLandingPage(false);
      return;
    } else {
      setActiveBlogId(null);
    }

    if (path === "/" || (path === "/index.html" && (!hash || hash === "#home"))) {
      setIsLandingPage(true);
    } else {
      setShowIntro(false);
      setIntroFinished(true);
    }
  }, [hash]);

  useEffect(() => {
    document.body.style.overflow =
      showIntro && isLandingPage ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [showIntro, isLandingPage]);

  return (
    <>
      <Analytics />
      <div className="relative">
        {isLandingPage && showIntro && (
          <Curtain
            videoSrc="./LOGO.webm"
            onComplete={() => console.log("Lifting...")}
            onVideoEnd={() => {
              setShowIntro(false);
              setIntroFinished(true);
            }}
          />
        )}
        <ClickSpark
          sparkColor="#fff"
          sparkSize={10}
          sparkRadius={15}
          sparkCount={8}
          duration={400}
        >
          <Cursor
            normalCursor={CursorImgNormal}
            linkCursor={CursorImgLink}
            size={25}
          />
          {activeBlogId ? (
            <BlogPost
              blogId={activeBlogId}
              onBack={() => {
                window.location.hash = "#blogs";
              }}
            />
          ) : (
            <main className="min-h-screen w-full bg-[#0a0d12] text-white selection:bg-[#3b82f6] selection:text-white">
              <Navbar />
              <Hero startAnimation={!isLandingPage || introFinished} />
              <Skills />
              <WorkExperience />
              <Works />
              {/* <Blogs /> */}

              <Philosophy />

              <div className="w-full bg-[#050a15]">
                <div className="relative z-10 max-w-6xl mx-auto px-6 pb-20">
                  <div className="flex flex-wrap lg:flex-nowrap items-bottom justify-center gap-8">
                    <ShowcaseCard
                      tag="Current Status"
                      title="Where am I right now?"
                      description="VIT bhopal university, pursuing B.tech in CSE"
                    />
                    <ShowcaseCard
                      tag="Future prospects"
                      title="Where am I planning to go next?"
                      description="Becoming an AI engineer"
                    />
                    <ShowcaseCard
                      tag="Execution"
                      title="What am I building right now?"
                      description="Working on better and deployable Agentic AI systems and MCP servers"
                    />
                  </div>
                </div>
              </div>

              <MottoSeparater />
              <Contact />
            </main>
          )}
        </ClickSpark>
      </div>
    </>
  );
}
