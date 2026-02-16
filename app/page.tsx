"use client"

import { useState } from "react"
import { AnimatePresence } from "framer-motion"
import { CyberGridBg } from "@/components/cyber-grid-bg"
import { BootSequence } from "@/components/boot-sequence"
import { CyberNav } from "@/components/cyber-nav"
import { HeroSection } from "@/components/hero-section"
import { AboutSection } from "@/components/about-section"
import { SkillsSection } from "@/components/skills-section"
import { ProjectsTerminal } from "@/components/projects-terminal"
import { ServicesSection } from "@/components/services-section"
import { ContactSection } from "@/components/contact-section"
import { CyberFooter } from "@/components/cyber-footer"

export default function Home() {
  const [booted, setBooted] = useState(false)

  return (
    <>
      {/* Boot sequence overlay */}
      <AnimatePresence>
        {!booted && <BootSequence onComplete={() => setBooted(true)} />}
      </AnimatePresence>

      {/* Main content - shown after boot completes */}
      {booted && (
        <div className="relative min-h-screen">
          {/* Persistent animated background */}
          <CyberGridBg />

          {/* Navigation */}
          <CyberNav />

          {/* Main content */}
          <main>
            <HeroSection />

            {/* Section divider */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" aria-hidden="true" />

            <AboutSection />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" aria-hidden="true" />

            <SkillsSection />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" aria-hidden="true" />

            <ProjectsTerminal />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" aria-hidden="true" />

            <ServicesSection />

            <div className="h-px w-full bg-gradient-to-r from-transparent via-cyber-blue/20 to-transparent" aria-hidden="true" />

            <ContactSection />
          </main>

          <CyberFooter />
        </div>
      )}
    </>
  )
}
