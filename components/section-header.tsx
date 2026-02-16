"use client"

import { motion } from "framer-motion"

interface SectionHeaderProps {
  tag: string
  title: string
  subtitle?: string
}

export function SectionHeader({ tag, title, subtitle }: SectionHeaderProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
      className="flex flex-col items-center text-center mb-16"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="h-px w-8 bg-cyber-blue/50" />
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cyber-blue">
          {tag}
        </span>
        <div className="h-px w-8 bg-cyber-blue/50" />
      </div>
      <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-foreground text-glow text-balance">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 max-w-xl font-mono text-sm text-muted-foreground leading-relaxed">
          {subtitle}
        </p>
      )}
      <div className="mt-6 h-px w-24 bg-gradient-to-r from-transparent via-cyber-blue/50 to-transparent" />
    </motion.div>
  )
}
