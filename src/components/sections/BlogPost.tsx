/* eslint-disable react-hooks/set-state-in-effect */
import { useState, useEffect } from "react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import fm from "front-matter";

const blogFiles = import.meta.glob("../../content/blogs/*.md", {
  query: "?raw",
  import: "default",
});

export default function BlogPost({ blogId, onBack }: { blogId: string; onBack: () => void }) {
  const [body, setBody] = useState("");
  const [loading, setLoading] = useState(true);
  const [currentBlogId, setCurrentBlogId] = useState(blogId);

  if (blogId !== currentBlogId) {
    setCurrentBlogId(blogId);
    setLoading(true);
  }

  useEffect(() => {
    // Ensure we scroll to top after any layout shifts or hash-based scrolling
    setTimeout(() => window.scrollTo(0, 0), 0);

    const matchingKey = Object.keys(blogFiles).find((path) =>
      path.endsWith(`/${blogId}.md`)
    );

    if (!matchingKey) {
      setBody("# Blog Not Found\nSorry, the blog you are looking for does not exist.");
      setLoading(false);
      return;
    }

    blogFiles[matchingKey]()
      .then((raw) => {
        const { body: content } = fm(raw as string);
        setBody(content);
        setLoading(false);
      })
      .catch(() => {
        setBody("# Error\nFailed to load the blog post.");
        setLoading(false);
      });
  }, [blogId]);

  return (
    <div className="min-h-screen bg-[#0a0d12] text-white pt-24 pb-20 px-6 sm:px-12 md:px-20 lg:px-40">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-gray-400 hover:text-blue-500 transition-colors mb-10 group"
        >
          <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-mono uppercase tracking-widest text-sm">Back to Portfolio</span>
        </button>

        {loading ? (
          <div className="animate-pulse space-y-8">
            <div className="h-12 bg-white/5 rounded w-3/4"></div>
            <div className="h-4 bg-white/5 rounded w-1/4"></div>
            <div className="space-y-4 pt-8">
              <div className="h-4 bg-white/5 rounded w-full"></div>
              <div className="h-4 bg-white/5 rounded w-full"></div>
              <div className="h-4 bg-white/5 rounded w-5/6"></div>
            </div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="prose prose-invert prose-lg prose-blue max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-500 hover:prose-a:text-blue-400 prose-img:rounded-xl prose-code:before:content-none prose-code:after:content-none"
          >
            <ReactMarkdown>{body}</ReactMarkdown>
          </motion.div>
        )}
      </div>
    </div>
  );
}
