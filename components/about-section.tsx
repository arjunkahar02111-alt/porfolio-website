"use client"

import { motion } from "framer-motion"
import { SectionHeader } from "./section-header"
import { Shield, Cpu, Globe, Zap } from "lucide-react"

const stats = [
  { label: "Years Active", value: "5+", icon: Zap },
  { label: "Projects Deployed", value: "50+", icon: Globe },
  { label: "Systems Built", value: "30+", icon: Cpu },
  { label: "Uptime Record", value: "99.9%", icon: Shield },
]

const profileData = [
  { key: "DESIGNATION", value: "Full-Stack Developer" },
  { key: "SPECIALIZATION", value: "Web Systems & Architecture" },
  { key: "CLEARANCE", value: "Level 5 — Unrestricted" },
  { key: "STATUS", value: "Active" },
  { key: "LOCATION", value: "Cyber Domain" },
]

export function AboutSection() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="// System Profile"
          title="About System"
          subtitle="Authenticated user profile. Full clearance granted."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Digital ID Card */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="glass rounded-lg p-6 md:p-8 neon-border hologram">
              {/* Card header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-sm bg-cyber-blue/10 flex items-center justify-center neon-border">
                    <span className="font-display text-lg font-bold text-cyber-blue">A</span>
                  </div>
                  <div>
                    <p className="font-display text-sm tracking-wider text-foreground">ARJUN</p>
                    <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                      Digital Operator
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <div className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span className="font-mono text-[10px] text-emerald-400 uppercase">Online</span>
                  </div>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    ID: ARJ-2026-X9
                  </span>
                </div>
              </div>

              {/* Separator */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent mb-6" />

              {/* Profile data */}
              <div className="space-y-3">
                {profileData.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between"
                  >
                    <span className="font-mono text-xs text-muted-foreground tracking-wider">
                      {item.key}
                    </span>
                    <span className={`font-mono text-xs ${item.key === "STATUS" ? "text-emerald-400" : "text-foreground"}`}>
                      {item.value}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Separator */}
              <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent my-6" />

              {/* Bio */}
              <p className="font-mono text-xs text-muted-foreground leading-relaxed">
                Experienced developer specializing in modern web technologies, scalable
                architectures, and high-performance systems. Passionate about crafting elegant
                solutions to complex problems across the digital frontier.
              </p>

              {/* Corner decorations */}
              <div className="absolute top-2 left-2 w-4 h-4 border-t border-l border-cyber-blue/30" aria-hidden="true" />
              <div className="absolute top-2 right-2 w-4 h-4 border-t border-r border-cyber-blue/30" aria-hidden="true" />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-b border-l border-cyber-blue/30" aria-hidden="true" />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-b border-r border-cyber-blue/30" aria-hidden="true" />
            </div>
          </motion.div>

          {/* Stats grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="grid grid-cols-2 gap-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="glass rounded-lg p-6 neon-border group hover:box-glow transition-all duration-500 flex flex-col items-center text-center"
              >
                <stat.icon className="w-6 h-6 text-cyber-blue mb-3 group-hover:scale-110 transition-transform" />
                <span className="font-display text-2xl md:text-3xl font-bold text-foreground text-glow">
                  {stat.value}
                </span>
                <span className="mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
