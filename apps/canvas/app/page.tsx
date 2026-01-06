'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Presentation, 
  Pencil, 
  Sparkles, 
  Download, 
  LayoutTemplate, 
  ArrowRight, 
  Shapes,
  Menu,
  X,
  Wand2,
  FileType
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Navbar ---
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/10 bg-black/50 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-orange-600 rounded-lg flex items-center justify-center -rotate-3 hover:rotate-0 transition-transform">
              <Pencil className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
              Cognitive Canvas
            </span>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-sm text-zinc-400 hover:text-white transition-colors">How it Works</a>
            <a href="#templates" className="text-sm text-zinc-400 hover:text-white transition-colors">Templates</a>
            <button className="px-4 py-2 text-sm font-medium text-white bg-white/10 border border-white/10 rounded-full hover:bg-white/20 transition-all">
              Login
            </button>
            <button className="px-4 py-2 text-sm font-bold text-black bg-orange-500 rounded-full hover:bg-orange-400 transition-all flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Generate PPT
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-400">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

// --- Hero Section with Split Mockup ---
const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-black">
      {/* Background Blobs */}
      <div className="absolute top-0 left-1/4 w-[600px] h-[500px] bg-orange-600/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[600px] h-[600px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 border border-orange-500/20 text-sm text-orange-300 mb-6">
            <Wand2 className="w-4 h-4" />
            <span>Now exporting to PowerPoint & Google Slides</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Sketch your thoughts. <br className="hidden md:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-amber-200">
              Auto-generate the slides.
            </span>
          </h1>
          
          <p className="mt-4 text-lg md:text-xl text-zinc-400 max-w-2xl mx-auto mb-10">
            The freedom of an infinite whiteboard meets the structure of AI. 
            Draw your lesson plan or flowchart, and let our AI build the presentation deck for you.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-black bg-white rounded-xl hover:bg-zinc-200 transition-all flex items-center justify-center gap-2 group">
              Start Drawing
              <Pencil className="w-4 h-4 group-hover:rotate-12 transition-transform" />
            </button>
            <button className="w-full sm:w-auto px-8 py-4 text-base font-bold text-white bg-zinc-900 border border-zinc-800 rounded-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2">
              <Presentation className="w-4 h-4" />
              See Example Deck
            </button>
          </div>
        </motion.div>

        {/* --- The Split Mockup --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-20 mx-auto max-w-6xl h-[500px] rounded-2xl border border-white/10 bg-zinc-950 shadow-2xl overflow-hidden grid grid-cols-1 md:grid-cols-2 relative group"
        >
          {/* LEFT SIDE: The Canvas (Excalidraw Style) */}
          <div className="relative border-r border-white/10 bg-[#121212] p-6 overflow-hidden">
             <div className="absolute top-4 left-4 text-xs font-mono text-zinc-500 flex items-center gap-2">
                <Pencil className="w-3 h-3" /> CANVAS MODE
             </div>
             
             {/* Canvas Dot Grid */}
             <div className="absolute inset-0 bg-[radial-gradient(#ffffff15_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

             {/* Handwritten Nodes */}
             <SketchNode x={50} y={80} text="Biology Class: Photosynthesis" width={200} rotate={-2} />
             <SketchNode x={80} y={180} text="Step 1: Sunlight absorbed" width={180} rotate={1} color="green" />
             <SketchNode x={200} y={250} text="Step 2: H2O Split" width={150} rotate={-3} color="blue" />
             
             {/* Hand drawn arrow SVG */}
             <svg className="absolute inset-0 pointer-events-none">
                <path d="M150,130 Q160,160 170,180" stroke="#71717a" strokeWidth="2" fill="none" />
                <path d="M180,220 Q200,240 210,250" stroke="#71717a" strokeWidth="2" fill="none" />
             </svg>
             
             {/* The "AI Processing" Beam */}
             <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-20 h-20 bg-orange-500/20 blur-xl rounded-full z-10 animate-pulse" />
          </div>

          {/* RIGHT SIDE: The PPT (Clean Style) */}
          <div className="relative bg-zinc-900 p-8 flex items-center justify-center">
             <div className="absolute top-4 right-4 text-xs font-mono text-orange-400 flex items-center gap-2">
                <Sparkles className="w-3 h-3" /> AI GENERATED SLIDE
             </div>

             {/* Slide Preview */}
             <div className="w-full aspect-video bg-white rounded-lg p-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-green-100 rounded-bl-full opacity-50" />
                
                <div className="h-full flex flex-col justify-center">
                  <div className="text-3xl font-bold text-zinc-900 mb-2 font-serif">Photosynthesis</div>
                  <div className="w-16 h-1 bg-green-500 mb-4" />
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 text-zinc-600">
                      <div className="w-6 h-6 rounded-full bg-green-100 text-green-700 flex items-center justify-center text-xs font-bold">1</div>
                      Energy absorption from sunlight
                    </li>
                    <li className="flex items-center gap-3 text-zinc-600">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center text-xs font-bold">2</div>
                      Water hydrolysis (Splitting H2O)
                    </li>
                  </ul>
                </div>
             </div>

             {/* Floating Export Button */}
             <div className="absolute bottom-8 right-8">
               <div className="px-4 py-2 bg-zinc-800 text-white text-xs rounded-lg border border-white/10 shadow-lg flex items-center gap-2">
                 <Download className="w-3 h-3" /> Export to PPTX
               </div>
             </div>
          </div>

          {/* Center Divider Icon */}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-zinc-800 rounded-full border border-white/10 flex items-center justify-center z-20 shadow-xl">
             <ArrowRight className="w-5 h-5 text-zinc-400" />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

// Helper for 'Hand Drawn' look
const SketchNode = ({ x, y, text, width, rotate, color = "white" }: any) => (
  <motion.div 
    initial={{ scale: 0 }}
    animate={{ scale: 1 }}
    className={cn(
      "absolute p-4 border-2 rounded-lg bg-[#1a1a1a]",
      "font-handwriting", // We'd ideally import a font like 'Virgil' here
      color === 'green' ? 'border-green-500/50 text-green-100' :
      color === 'blue' ? 'border-blue-500/50 text-blue-100' : 'border-zinc-600 text-white'
    )}
    style={{ 
      left: x, 
      top: y, 
      width: width, 
      transform: `rotate(${rotate}deg)`,
      borderRadius: '2px 255px 3px 25px / 255px 5px 225px 5px' // Sketchy border radius trick
    }}
  >
    <div className="text-sm font-medium leading-tight">{text}</div>
  </motion.div>
);

const Features = () => {
  const features = [
    {
      title: "Infinite Canvas",
      desc: "Just like Excalidraw. Hand-drawn feel, infinite zoom, and basic shapes. Perfect for rough brainstorming.",
      icon: Shapes,
      color: "bg-blue-500/10 text-blue-400"
    },
    {
      title: "One-Click PPT Generation",
      desc: "Select an area on your canvas, click 'Generate', and get a fully formatted PowerPoint file instantly.",
      icon: FileType,
      color: "bg-orange-500/10 text-orange-400"
    },
    {
      title: "Smart Templates",
      desc: "Built-in layouts for Lectures, Pitch Decks, and Project Roadmaps that adapt to your sketched content.",
      icon: LayoutTemplate,
      color: "bg-purple-500/10 text-purple-400"
    },
  ];

  return (
    <section id="features" className="py-24 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">Visual Thinking to Structured Slides</h2>
          <p className="text-zinc-400 max-w-2xl mx-auto text-lg">
            Stop fighting with presentation software. Draw your ideas naturally, and let our AI handle the formatting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-3xl border border-white/10 bg-zinc-900/50 hover:bg-zinc-900 transition-colors"
            >
              <div className={cn("w-14 h-14 rounded-xl flex items-center justify-center mb-6", f.color)}>
                <f.icon className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{f.title}</h3>
              <p className="text-zinc-400 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const UseCases = () => {
  return (
    <section className="py-24 bg-black border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
         <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row">
            <div className="p-12 md:w-1/2 flex flex-col justify-center">
              <h3 className="text-3xl font-bold text-white mb-6">Perfect for Educators</h3>
              <ul className="space-y-4">
                {[
                  "Map out history timelines visually", 
                  "Draw chemical bonds and equations", 
                  "Convert mind-maps into lesson summaries"
                ].map((item, i) => (
                  <li key={i} className="flex items-center gap-3 text-zinc-300">
                    <div className="w-6 h-6 rounded-full bg-green-500/20 text-green-400 flex items-center justify-center">✓</div>
                    {item}
                  </li>
                ))}
              </ul>
              <button className="mt-8 self-start px-6 py-3 bg-white text-black font-semibold rounded-lg hover:bg-zinc-200 transition-colors">
                Try Education Mode
              </button>
            </div>
            <div className="md:w-1/2 bg-zinc-800/50 min-h-[300px] relative">
               {/* Decorative Abstract Teacher UI */}
               <div className="absolute inset-0 flex items-center justify-center text-zinc-600 font-mono text-sm">
                 [Interactive Demo Placeholder]
               </div>
            </div>
         </div>
      </div>
    </section>
  )
}

const Footer = () => {
  return (
    <footer className="py-8 border-t border-white/10 bg-black text-center text-zinc-500 text-sm">
      <p>&copy; 2024 Cognitive Canvas. The AI Whiteboard for Presenters.</p>
    </footer>
  )
}

// --- Main Page Component ---
const Page = () => {
  return (
    <div className="min-h-screen bg-black text-white selection:bg-orange-500/30">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <UseCases />
      </main>
      <Footer />
    </div>
  );
};

export default Page;