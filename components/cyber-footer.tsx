"use client"

import { motion } from "framer-motion"

export function CyberFooter() {
  return (
    <footer className="relative border-t border-border py-12">
      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col items-center text-center gap-4"
        >
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded-sm flex items-center justify-center bg-cyber-blue/10 neon-border">
              <span className="font-display text-[10px] font-bold text-cyber-blue">A</span>
            </div>
            <span className="font-display text-xs tracking-wider text-foreground">
              ARJUN<span className="text-cyber-blue">.DEV</span>
            </span>
          </div>

          <div className="h-px w-24 bg-gradient-to-r from-transparent via-cyber-blue/30 to-transparent" />

          <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
            Designed & Built in the Cyber Domain
          </p>

          <p className="font-mono text-[10px] text-muted-foreground">
            {"\u00A9"} {new Date().getFullYear()} ARJUN. All systems operational.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
