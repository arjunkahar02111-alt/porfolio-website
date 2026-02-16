"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { SectionHeader } from "./section-header"

const skillCategories = [
  {
    name: "Frontend",
    skills: [
      { name: "React / Next.js", level: 95, desc: "Advanced SSR, RSC, and App Router patterns" },
      { name: "TypeScript", level: 90, desc: "Strict types, generics, and utility types" },
      { name: "TailwindCSS", level: 92, desc: "Custom design systems and responsive layouts" },
      { name: "Three.js / WebGL", level: 75, desc: "3D rendering, shaders, and interactive scenes" },
    ],
  },
  {
    name: "Backend",
    skills: [
      { name: "Node.js", level: 90, desc: "REST, GraphQL, and microservice architectures" },
      { name: "Python", level: 85, desc: "FastAPI, Django, data processing pipelines" },
      { name: "PostgreSQL", level: 88, desc: "Query optimization and schema design" },
      { name: "Redis", level: 80, desc: "Caching strategies and pub/sub messaging" },
    ],
  },
  {
    name: "DevOps",
    skills: [
      { name: "Docker", level: 85, desc: "Container orchestration and multi-stage builds" },
      { name: "AWS / Cloud", level: 82, desc: "Serverless, Lambda, and infrastructure as code" },
      { name: "CI/CD", level: 88, desc: "GitHub Actions, automated testing pipelines" },
      { name: "Linux Systems", level: 80, desc: "Server administration and shell scripting" },
    ],
  },
]

export function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState(0)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  return (
    <section id="skills" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="// Capabilities"
          title="Skills Matrix"
          subtitle="Core competencies and technology proficiency levels."
        />

        {/* Category tabs */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-1 p-1 rounded-lg bg-secondary/50 neon-border">
            {skillCategories.map((cat, i) => (
              <button
                key={cat.name}
                onClick={() => setActiveCategory(i)}
                className={`relative px-6 py-2.5 font-mono text-xs uppercase tracking-wider rounded-md transition-all duration-300 ${
                  activeCategory === i
                    ? "text-cyber-blue"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {activeCategory === i && (
                  <motion.div
                    layoutId="skill-tab"
                    className="absolute inset-0 bg-cyber-blue/10 rounded-md neon-border"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.name}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Skills display */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto"
          >
            {skillCategories[activeCategory].skills.map((skill, i) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
                onMouseEnter={() => setHoveredSkill(skill.name)}
                onMouseLeave={() => setHoveredSkill(null)}
                className="glass rounded-lg p-5 neon-border group hover:box-glow transition-all duration-500"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="font-mono text-sm text-foreground">{skill.name}</span>
                  <span className="font-mono text-xs text-cyber-blue">{skill.level}%</span>
                </div>

                {/* Progress bar */}
                <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1.5, delay: i * 0.15, ease: "easeOut" }}
                    style={{
                      background: "linear-gradient(90deg, rgba(0,212,255,0.3), rgba(0,212,255,0.8))",
                      boxShadow: "0 0 10px rgba(0,212,255,0.3)",
                    }}
                  />
                </div>

                {/* Description on hover */}
                <AnimatePresence>
                  {hoveredSkill === skill.name && (
                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      className="mt-3 font-mono text-[11px] text-muted-foreground leading-relaxed"
                    >
                      {skill.desc}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* Radar-style visualization */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex justify-center"
        >
          <div className="relative w-64 h-64 md:w-80 md:h-80">
            {/* Concentric hexagons */}
            {[1, 0.75, 0.5, 0.25].map((scale, i) => (
              <div
                key={i}
                className="absolute inset-0 flex items-center justify-center"
                aria-hidden="true"
              >
                <div
                  className="hexagon border border-cyber-blue/10"
                  style={{
                    width: `${scale * 100}%`,
                    height: `${scale * 100}%`,
                    background: i === 0 ? "rgba(0,212,255,0.02)" : "transparent",
                  }}
                />
              </div>
            ))}
            {/* Skill points around the hex */}
            {["React", "Node", "TypeScript", "Cloud", "DB", "DevOps"].map((label, i) => {
              const angle = (i / 6) * Math.PI * 2 - Math.PI / 2
              const radius = 45
              const x = 50 + radius * Math.cos(angle)
              const y = 50 + radius * Math.sin(angle)
              return (
                <div
                  key={label}
                  className="absolute flex flex-col items-center gap-1"
                  style={{
                    left: `${x}%`,
                    top: `${y}%`,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <div className="h-2.5 w-2.5 rounded-full bg-cyber-blue animate-pulse-glow" />
                  <span className="font-mono text-[9px] text-muted-foreground uppercase tracking-wider whitespace-nowrap">
                    {label}
                  </span>
                </div>
              )
            })}
            {/* Center label */}
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="font-display text-xs text-cyber-blue uppercase tracking-widest">
                Matrix
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
