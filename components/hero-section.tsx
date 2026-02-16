"use client"

import { motion } from "framer-motion"
import { TypingText } from "./typing-text"
import { ChevronDown, Terminal, Scan } from "lucide-react"

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Radial gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 0%, rgba(6,10,20,0.4) 50%, rgba(6,10,20,0.9) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        {/* Status indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex items-center gap-2 mb-8"
        >
          <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-muted-foreground">
            System Online — All Modules Active
          </span>
        </motion.div>

        {/* Main heading */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight text-glow-strong text-foreground">
            <span className="text-cyber-blue">DEV</span>
            <span className="mx-3 md:mx-4 text-muted-foreground font-light">|</span>
            <span>ARJUN</span>
          </h1>
        </motion.div>

        {/* Subtitle typing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-6 font-mono text-base md:text-lg text-muted-foreground"
        >
          <TypingText
            texts={[
              "Full-Stack Developer",
              "System Architect",
              "Cyber Domain Specialist",
              "Digital Craftsman",
            ]}
            speed={60}
            deleteSpeed={30}
            pauseDuration={2500}
          />
        </motion.div>

        {/* Decorative line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="mt-8 h-px w-48 md:w-72 bg-gradient-to-r from-transparent via-cyber-blue to-transparent"
        />

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#about"
            className="group relative flex items-center gap-3 px-8 py-3 font-display text-sm uppercase tracking-wider rounded-sm overflow-hidden transition-all duration-300 bg-cyber-blue/10 text-cyber-blue neon-border hover:bg-cyber-blue/20"
          >
            <Scan className="w-4 h-4" />
            Explore System
            <span className="absolute bottom-0 left-0 h-px w-0 bg-cyber-blue transition-all duration-500 group-hover:w-full" />
          </a>
          <a
            href="#terminal"
            className="group relative flex items-center gap-3 px-8 py-3 font-display text-sm uppercase tracking-wider rounded-sm overflow-hidden transition-all duration-300 bg-secondary text-foreground border border-border hover:border-cyber-blue/30"
          >
            <Terminal className="w-4 h-4" />
            Access Terminal
            <span className="absolute bottom-0 left-0 h-px w-0 bg-cyber-blue transition-all duration-500 group-hover:w-full" />
          </a>
        </motion.div>

        {/* HUD corners */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-3xl aspect-square pointer-events-none" aria-hidden="true">
          {/* Top-left corner */}
          <div className="absolute top-0 left-0 w-8 h-8 border-t border-l border-cyber-blue/20" />
          {/* Top-right corner */}
          <div className="absolute top-0 right-0 w-8 h-8 border-t border-r border-cyber-blue/20" />
          {/* Bottom-left corner */}
          <div className="absolute bottom-0 left-0 w-8 h-8 border-b border-l border-cyber-blue/20" />
          {/* Bottom-right corner */}
          <div className="absolute bottom-0 right-0 w-8 h-8 border-b border-r border-cyber-blue/20" />
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
          Scroll
        </span>
        <ChevronDown className="w-4 h-4 text-cyber-blue animate-bounce" />
      </motion.div>
    </section>
  )
}
