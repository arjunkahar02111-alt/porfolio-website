"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "./section-header"
import { Send, Github, ExternalLink, Youtube, AlertCircle, CheckCircle2 } from "lucide-react"
import { SendHorizonal } from "lucide-react"
import { Instagram } from "lucide-react"
import { sendContactMessage } from "@/app/actions/contact"

const socialLinks = [
  { icon: Github, label: "GitHub", href: "https://github.com/hackoarjunz", handle: "@hackoarjunz" },
  { icon: SendHorizonal, label: "Telegram", href: "https://t.me/hackerzxarjunnnn", handle: "@hackerzxarjunnnn" },
  { icon: Instagram, label: "Instagram", href: "https://www.instagram.com/arjunnn021?igsh=MWI3emw3Z3VtYWE2", handle: "@arjunnn021" },
  { icon: Youtube, label: "YouTube", href: "https://www.youtube.com/@gamingarjun368", handle: "@gamingarjun368" },
]

export function ContactSection() {
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSending, setIsSending] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSending(true)
    setError(null)

    try {
      const result = await sendContactMessage(formState)

      if (result.success) {
        setSent(true)
        setFormState({ name: "", email: "", message: "" })
        setTimeout(() => setSent(false), 4000)
      } else {
        setError(result.error || "Something went wrong.")
      }
    } catch (err: unknown) {
      console.error("[v0] Contact form error:", err)
      const msg = err instanceof Error ? err.message : "Unknown error"
      setError(`Connection failed: ${msg}`)
    } finally {
      setIsSending(false)
    }
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="// Transmission"
          title="Contact Console"
          subtitle="Establish a secure communication channel."
        />

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
          >
            <div className="glass rounded-lg neon-border p-6 md:p-8 relative scanline overflow-hidden">
              {/* Scan line effect */}
              <div
                className="absolute left-0 right-0 h-px bg-cyber-blue/20 pointer-events-none"
                style={{
                  animation: "scan-line 4s linear infinite",
                }}
                aria-hidden="true"
              />

              <div className="flex items-center gap-3 mb-6">
                <div className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
                <span className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                  Secure Channel Established
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name field */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Operator Name
                  </label>
                  <div className={`relative rounded-sm overflow-hidden transition-all duration-300 ${
                    focusedField === "name" ? "box-glow" : ""
                  }`}>
                    <input
                      type="text"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      onFocus={() => setFocusedField("name")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-secondary/50 border border-border focus:border-cyber-blue/50 rounded-sm font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors"
                      placeholder="Enter name..."
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Comms Address
                  </label>
                  <div className={`relative rounded-sm overflow-hidden transition-all duration-300 ${
                    focusedField === "email" ? "box-glow" : ""
                  }`}>
                    <input
                      type="email"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      onFocus={() => setFocusedField("email")}
                      onBlur={() => setFocusedField(null)}
                      required
                      className="w-full px-4 py-3 bg-secondary/50 border border-border focus:border-cyber-blue/50 rounded-sm font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors"
                      placeholder="Enter email..."
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="space-y-2">
                  <label className="font-mono text-xs text-muted-foreground uppercase tracking-wider">
                    Transmission
                  </label>
                  <div className={`relative rounded-sm overflow-hidden transition-all duration-300 ${
                    focusedField === "message" ? "box-glow" : ""
                  }`}>
                    <textarea
                      value={formState.message}
                      onChange={(e) => setFormState({ ...formState, message: e.target.value })}
                      onFocus={() => setFocusedField("message")}
                      onBlur={() => setFocusedField(null)}
                      required
                      rows={5}
                      className="w-full px-4 py-3 bg-secondary/50 border border-border focus:border-cyber-blue/50 rounded-sm font-mono text-sm text-foreground placeholder:text-muted-foreground outline-none transition-colors resize-none"
                      placeholder="Enter message..."
                    />
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={isSending || sent}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 font-display text-sm uppercase tracking-wider rounded-sm bg-cyber-blue/10 text-cyber-blue neon-border hover:bg-cyber-blue/20 transition-all duration-300 disabled:opacity-50"
                >
                  {isSending ? (
                    <>
                      <div className="h-4 w-4 border-2 border-cyber-blue/30 border-t-cyber-blue rounded-full animate-spin" />
                      Transmitting...
                    </>
                  ) : sent ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">Transmission Sent Successfully</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      Send Transmission
                    </>
                  )}
                </button>

                {error && (
                  <div className="flex items-center gap-2 p-3 rounded-sm bg-red-500/10 border border-red-500/30">
                    <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                    <span className="font-mono text-xs text-red-400">{error}</span>
                  </div>
                )}
              </form>
            </div>
          </motion.div>

          {/* Right side info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Connection info */}
            <div className="glass rounded-lg p-6 neon-border">
              <h3 className="font-display text-sm tracking-wider text-foreground mb-4">
                Connection Details
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">PROTOCOL</span>
                  <span className="font-mono text-xs text-emerald-400">ENCRYPTED</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">RESPONSE</span>
                  <span className="font-mono text-xs text-foreground">{"< 24h"}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">TIMEZONE</span>
                  <span className="font-mono text-xs text-foreground">UTC +5:30</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">AVAILABILITY</span>
                  <span className="font-mono text-xs text-emerald-400">OPEN</span>
                </div>
              </div>
            </div>

            {/* Social links */}
            <div className="glass rounded-lg p-6 neon-border">
              <h3 className="font-display text-sm tracking-wider text-foreground mb-4">
                Social Networks
              </h3>
              <div className="space-y-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    className="flex items-center justify-between group p-2 -mx-2 rounded-sm hover:bg-secondary/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="w-4 h-4 text-muted-foreground group-hover:text-cyber-blue transition-colors" />
                      <span className="font-mono text-xs text-muted-foreground group-hover:text-foreground transition-colors">
                        {link.label}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[10px] text-muted-foreground">
                        {link.handle}
                      </span>
                      <ExternalLink className="w-3 h-3 text-muted-foreground group-hover:text-cyber-blue transition-colors" />
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Coordinates */}
            <div className="glass rounded-lg p-6 neon-border text-center">
              <p className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider mb-2">
                Operating from the Digital Frontier
              </p>
              <p className="font-display text-sm text-cyber-blue text-glow tracking-wider">
                CYBER DOMAIN ACTIVE
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
