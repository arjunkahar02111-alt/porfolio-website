"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

const bootLines = [
  "[SYS] Initializing ARJUN_OS v4.2.1...",
  "[SYS] Loading neural interface modules...",
  "[NET] Establishing secure connection... OK",
  "[GPU] Rendering pipeline activated",
  "[SEC] Encryption protocols engaged",
  "[SYS] Cyber domain online. Welcome, Operator.",
]

export function BootSequence({ onComplete }: { onComplete: () => void }) {
  const [currentLine, setCurrentLine] = useState(0)
  const [showLines, setShowLines] = useState<string[]>([])
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    if (currentLine < bootLines.length) {
      const timer = setTimeout(() => {
        setShowLines((prev) => [...prev, bootLines[currentLine]])
        setCurrentLine((prev) => prev + 1)
        setProgress(((currentLine + 1) / bootLines.length) * 100)
      }, 300)
      return () => clearTimeout(timer)
    } else {
      const timer = setTimeout(onComplete, 600)
      return () => clearTimeout(timer)
    }
  }, [currentLine, onComplete])

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-cyber-dark"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-full max-w-lg px-6">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-3 w-3 rounded-full bg-cyber-blue animate-pulse" />
          <span className="font-display text-xs uppercase tracking-[0.3em] text-cyber-blue">
            System Boot
          </span>
        </div>

        <div className="font-mono text-sm space-y-1">
          {showLines.map((line, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
              className="text-muted-foreground"
            >
              <span className="text-cyber-blue">{">>"}</span>{" "}
              {line}
            </motion.div>
          ))}
          {currentLine < bootLines.length && (
            <div className="text-cyber-blue terminal-cursor" />
          )}
        </div>

        <div className="mt-8">
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono text-xs text-muted-foreground">
              LOADING SYSTEMS
            </span>
            <span className="font-mono text-xs text-cyber-blue">
              {Math.round(progress)}%
            </span>
          </div>
          <div className="h-1 w-full rounded-full bg-secondary overflow-hidden">
            <motion.div
              className="h-full rounded-full bg-cyber-blue"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.3 }}
              style={{
                boxShadow: "0 0 10px rgba(0,212,255,0.5)",
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}
