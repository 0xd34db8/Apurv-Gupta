import { useState } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 w-full p-6 md:p-10 flex justify-between items-center z-50 mix-blend-difference">
        <div className="text-xl font-bold tracking-tighter">
          <a
            href="#home"
            aria-label="Home"
            className="flex items-center gap-1 select-none font-medium"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              className="fill-current text-white hover:text-[hsl(220,100%,60%)] transition-colors"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 3L2 11H5V21H10V15H14V21H19V11H22L12 3Z" />
            </svg>
          </a>
        </div>
        
        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-xs font-medium uppercase tracking-[0.2em]">
          <a href="#work" className="hover:text-[hsl(220,100%,60%)] transition-colors">Projects</a>
          <a href="#experience" className="hover:text-[hsl(220,100%,60%)] transition-colors">Experience</a>
          <a href="#skills" className="hover:text-[hsl(220,100%,60%)] transition-colors">Tech</a>
          <a href="#blogs" className="hover:text-[hsl(220,100%,60%)] transition-colors">Blogs</a>
          <a href="#contact" className="hover:text-[hsl(220,100%,60%)] transition-colors">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white hover:text-[hsl(220,100%,60%)] transition-colors"
          onClick={() => setIsOpen(true)}
          aria-label="Open Menu"
        >
          <Menu size={24} />
        </button>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-[#090b0e] flex flex-col justify-center items-center"
          >
            <button 
              className="absolute top-6 right-6 p-2 text-white hover:text-[hsl(220,100%,60%)] transition-colors"
              onClick={() => setIsOpen(false)}
              aria-label="Close Menu"
            >
              <X size={32} />
            </button>
            <div className="flex flex-col gap-8 text-2xl font-medium uppercase tracking-[0.2em] text-center">
              <a href="#work" onClick={() => setIsOpen(false)} className="hover:text-[hsl(220,100%,60%)] transition-colors">Projects</a>
              <a href="#experience" onClick={() => setIsOpen(false)} className="hover:text-[hsl(220,100%,60%)] transition-colors">Experience</a>
              <a href="#skills" onClick={() => setIsOpen(false)} className="hover:text-[hsl(220,100%,60%)] transition-colors">Tech</a>
              <a href="#blogs" onClick={() => setIsOpen(false)} className="hover:text-[hsl(220,100%,60%)] transition-colors">Blogs</a>
              <a href="#contact" onClick={() => setIsOpen(false)} className="hover:text-[hsl(220,100%,60%)] transition-colors">Contact</a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
