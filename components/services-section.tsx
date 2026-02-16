"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "./section-header"
import { Globe, Server, Shield, Code, Database, Cpu } from "lucide-react"

const services = [
  {
    icon: Globe,
    title: "Web Development",
    desc: "Modern, responsive web applications built with cutting-edge frameworks and optimized for performance.",
    tech: ["React", "Next.js", "TypeScript"],
  },
  {
    icon: Server,
    title: "Backend Systems",
    desc: "Scalable server architectures, RESTful APIs, and microservice ecosystems designed for reliability.",
    tech: ["Node.js", "Python", "GraphQL"],
  },
  {
    icon: Database,
    title: "Database Design",
    desc: "Optimized data models, migration strategies, and query performance tuning for complex datasets.",
    tech: ["PostgreSQL", "MongoDB", "Redis"],
  },
  {
    icon: Shield,
    title: "Security Auditing",
    desc: "Comprehensive security assessments, penetration testing, and vulnerability remediation protocols.",
    tech: ["OWASP", "Auth", "Encryption"],
  },
  {
    icon: Code,
    title: "API Integration",
    desc: "Seamless third-party integrations, webhook systems, and real-time data synchronization pipelines.",
    tech: ["REST", "WebSocket", "gRPC"],
  },
  {
    icon: Cpu,
    title: "System Architecture",
    desc: "High-level system design, infrastructure planning, and cloud deployment strategies.",
    tech: ["AWS", "Docker", "K8s"],
  },
]

export function ServicesSection() {
  const [flipped, setFlipped] = useState<number | null>(null)

  return (
    <section id="services" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="// Operations"
          title="Cyber Services"
          subtitle="Specialized capabilities deployed across the digital frontier."
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="group relative perspective-1000"
              onMouseEnter={() => setFlipped(i)}
              onMouseLeave={() => setFlipped(null)}
              style={{ perspective: "1000px" }}
            >
              <div
                className="relative w-full transition-transform duration-700 preserve-3d"
                style={{
                  transformStyle: "preserve-3d",
                  transform: flipped === i ? "rotateY(180deg)" : "rotateY(0deg)",
                }}
              >
                {/* Front */}
                <div
                  className="glass rounded-lg p-6 neon-border hover:box-glow transition-all duration-500 min-h-[220px] flex flex-col"
                  style={{ backfaceVisibility: "hidden" }}
                >
                  <div className="mb-4 h-12 w-12 rounded-lg bg-cyber-blue/10 flex items-center justify-center neon-border group-hover:bg-cyber-blue/20 transition-colors">
                    <service.icon className="w-5 h-5 text-cyber-blue" />
                  </div>
                  <h3 className="font-display text-sm tracking-wider text-foreground mb-2">
                    {service.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground leading-relaxed flex-1">
                    {service.desc}
                  </p>
                  <div className="mt-4 flex gap-2">
                    {service.tech.map((t) => (
                      <span
                        key={t}
                        className="font-mono text-[10px] text-cyber-blue px-2 py-1 rounded-sm bg-cyber-blue/5 border border-cyber-blue/10"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Back */}
                <div
                  className="absolute inset-0 glass rounded-lg p-6 neon-border box-glow flex flex-col items-center justify-center text-center min-h-[220px]"
                  style={{
                    backfaceVisibility: "hidden",
                    transform: "rotateY(180deg)",
                  }}
                >
                  <service.icon className="w-10 h-10 text-cyber-blue mb-4" />
                  <h3 className="font-display text-lg tracking-wider text-cyber-blue mb-2 text-glow">
                    {service.title}
                  </h3>
                  <p className="font-mono text-xs text-muted-foreground">
                    Hover away to flip back
                  </p>
                  <div className="mt-4 h-px w-16 bg-gradient-to-r from-transparent via-cyber-blue to-transparent" />
                  <p className="mt-3 font-mono text-[10px] text-cyber-blue uppercase tracking-widest">
                    Engage Module
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
