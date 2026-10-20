import { useState, useEffect } from "react";
import StreakBurst from "../ui/StreakBurst";
import { motion } from "framer-motion";
import F22 from "../../assets/Wireframes/F22.png";
import WireframeOverlay from "../ui/WireframeOverlay";
import fm from "front-matter";

interface BlogMeta {
  title: string;
  description: string;
  date: string;
  tags: string[];
  slug: string;
}

const blogFiles = import.meta.glob("../../content/blogs/*.md", {
  query: "?raw",
  import: "default",
});

export default function Blogs() {
  const [blogs, setBlogs] = useState<BlogMeta[]>([]);

  useEffect(() => {
    const loadBlogs = async () => {
      const entries = await Promise.all(
        Object.entries(blogFiles).map(async ([path, load]) => {
          const raw = (await load()) as string;
          const { attributes } = fm<Omit<BlogMeta, "slug">>(raw);
          const slug = path
            .split("/")
            .pop()!
            .replace(/\.md$/, "");
          return { ...attributes, slug };
        })
      );

      // Sort by date descending
      entries.sort(
        (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setBlogs(entries);
    };

    loadBlogs();
  }, []);

  return (
    <section
      id="blogs"
      className="relative lg:py-24 sm:pt-20 px-4 sm:px-6 md:px-16 pb-20 md:pb-24 bg-[#090b0e] overflow-hidden"
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 102, 255, 0.23) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 102, 255, 0.23) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage:
            "radial-gradient(circle at 50% 50%, black 40%, transparent 90%)",
          WebkitMaskImage:
            "radial-gradient(circle at 50% 50%, black 40%, transparent 90%)",
        }}
      />

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(0, 102, 255, 0.05) 0%, transparent 60%, #090b0e 100%)",
        }}
      />

      {/* BOTTOM FADE */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 md:h-52 pointer-events-none z-10"
        style={{
          background: "linear-gradient(to top, #050a15 0%, #050a15 20%, transparent 100%)",
        }}
      />

      {/* F22 WIREFRAME OVERLAY */}
      <WireframeOverlay
        src={F22}
        alt="F-22 Raptor"
        className="md:pt-10 pt-20"
      />

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-mono text-gray-500 uppercase mb-12 sm:mb-10 flex items-center gap-2"
        >

          / Thoughts & Insights
        </motion.h3>

        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none pb-4 flex items-baseline mb-12 sm:mb-20">
          <StreakBurst
            text="Blogs"
            className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-100 to-white pb-2"
            delay={0.4}
          />
        </h2>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 md:mx-0 md:px-0 snap-x snap-mandatory no-scrollbar touch-pan-x">
          {blogs.map((blog, i) => (
            <motion.a
              href={`/blog/${blog.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              key={blog.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="w-[85vw] sm:w-[350px] md:w-auto flex-shrink-0 md:flex-shrink snap-center group relative p-6 sm:p-8 rounded-2xl bg-transparent sm:bg-[#0d1117]/60 sm:backdrop-blur-md group-hover:bg-transparent group-hover:backdrop-blur-none border border-white/5 hover:border-blue-500/30 transition-all duration-500 overflow-hidden group-hover:shadow-[0_0_30px_rgba(59,130,246,0.05)] flex flex-col justify-between"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

              <div className="relative z-10 flex flex-col gap-4 h-full">
                <div className="flex items-center justify-between">
                  <p className="font-mono text-xs text-blue-400">{blog.date}</p>
                  <span className="text-gray-400 text-sm group-hover:text-blue-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300">
                    ↗
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-white group-hover:text-blue-300 transition-colors duration-300">
                  {blog.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {blog.description}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {blog.tags?.map((tag, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 text-xs font-mono text-blue-300/70 bg-blue-500/10 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
