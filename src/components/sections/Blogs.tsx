import { useState, useEffect } from "react";
import StreakBurst from "../ui/StreakBurst";
import { motion } from "framer-motion";
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
      className="relative lg:py-24 sm:pt-20 px-4 sm:px-6 md:px-16 bg-[#090b0e] overflow-hidden"
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

      <div className="max-w-7xl mx-auto relative z-10">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-xs sm:text-sm font-mono text-gray-500 uppercase mb-12 sm:mb-10 flex items-center gap-2"
        >
          <span className="w-2 h-2 bg-blue-600 animate-pulse rounded-full shadow-[0_0_8px_rgba(37,99,235,0.8)]" />
          / Thoughts & Insights
        </motion.h2>

        <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none pb-4 flex items-baseline mb-12 sm:mb-20">
          <StreakBurst
            text="Blogs"
            className="italic text-transparent bg-clip-text bg-gradient-to-r from-gray-400 via-gray-100 to-white pb-2"
            delay={0.4}
          />
        </h1>

        <div className="flex overflow-x-auto md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 pb-4 snap-x snap-mandatory no-scrollbar">
          {blogs.map((blog, i) => (
            <motion.a
              href={`#blog/${blog.slug}`}
              key={blog.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="min-w-[85vw] sm:min-w-[350px] md:min-w-0 snap-center group block relative p-[1px] overflow-hidden rounded-2xl bg-gradient-to-b from-white/10 to-white/5 hover:from-blue-500/50 hover:to-blue-600/20 transition-all duration-500"
            >
              <div className="absolute inset-0 bg-blue-500/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-in-out" />
              <div className="relative h-full bg-[#050a15] rounded-2xl p-8 flex flex-col gap-4 z-10">
                <p className="font-mono text-xs text-blue-400">{blog.date}</p>
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
