"use client"

import { useState, useRef, useEffect, useCallback } from "react"
import { motion } from "framer-motion"
import { SectionHeader } from "./section-header"

interface TerminalLine {
  type: "input" | "output" | "error" | "system"
  content: string
}

const commandResponses: Record<string, string[]> = {
  help: [
    "Available commands:",
    "",
    "  help       - Show this help message",
    "  projects   - List all projects",
    "  contact    - Show contact information",
    "  social     - Show social links",
    "  skills     - Display skill summary",
    "  about      - About Arjun",
    "  clear      - Clear terminal",
    "  whoami     - Display current user",
    "  date       - Show current date",
    "  matrix     - Enter the matrix",
  ],
  projects: [
    "┌─────────────────────────────────────────────────┐",
    "│  PROJECT REGISTRY — Arjun's Deployments         │",
    "├─────────────────────────────────────────────────┤",
    "│                                                  │",
    "│  [01] CyberShield Dashboard                      │",
    "│       Real-time security monitoring platform      │",
    "│       Stack: Next.js, WebSocket, PostgreSQL       │",
    "│       Status: DEPLOYED                            │",
    "│                                                  │",
    "│  [02] NeuralChat AI                              │",
    "│       AI-powered conversational interface         │",
    "│       Stack: React, Python, TensorFlow            │",
    "│       Status: DEPLOYED                            │",
    "│                                                  │",
    "│  [03] CloudVault Storage                          │",
    "│       Encrypted cloud storage system              │",
    "│       Stack: Node.js, AWS S3, Redis               │",
    "│       Status: DEPLOYED                            │",
    "│                                                  │",
    "│  [04] DevOps Pipeline Manager                    │",
    "│       CI/CD automation and monitoring             │",
    "│       Stack: Docker, GitHub Actions, Go           │",
    "│       Status: ACTIVE                              │",
    "│                                                  │",
    "│  [05] QuantumTrade Platform                      │",
    "│       High-frequency trading dashboard            │",
    "│       Stack: React, Rust, WebAssembly             │",
    "│       Status: IN DEVELOPMENT                      │",
    "│                                                  │",
    "└─────────────────────────────────────────────────┘",
  ],
  contact: [
    "╔══════════════════════════════════════════════════════╗",
    "║  CONTACT INFORMATION                                ║",
    "╠══════════════════════════════════════════════════════╣",
    "║                                                      ║",
    "║  GitHub:     github.com/hackoarjunz                  ║",
    "║  Telegram:   t.me/hackerzxarjunnnn                   ║",
    "║  Instagram:  instagram.com/arjunnn021                ║",
    "║  YouTube:    youtube.com/@gamingarjun368              ║",
    "║                                                      ║",
    "╚══════════════════════════════════════════════════════╝",
  ],
  social: [
    ">> Social Networks:",
    "",
    "  GitHub     — github.com/hackoarjunz",
    "  Telegram   — t.me/hackerzxarjunnnn",
    "  Instagram  — instagram.com/arjunnn021",
    "  YouTube    — youtube.com/@gamingarjun368",
  ],
  skills: [
    ">> Skill Modules Loaded:",
    "",
    "  Frontend   ████████████████████░  95%",
    "  Backend    ██████████████████░░░  90%",
    "  DevOps     █████████████████░░░░  85%",
    "  Database   ██████████████████░░░  88%",
    "  Security   ████████████████░░░░░  80%",
    "  AI/ML      ██████████████░░░░░░░  70%",
  ],
  about: [
    ">> About ARJUN:",
    "",
    "  Full-stack developer and system architect",
    "  with 5+ years of experience building",
    "  high-performance web applications and",
    "  distributed systems.",
    "",
    "  Specializing in modern JavaScript/TypeScript",
    "  ecosystems, cloud infrastructure, and",
    "  cybersecurity protocols.",
    "",
    '  "Code is poetry written in logic."',
  ],
  whoami: [">> operator@arjun-os:~$ ARJUN — Level 5 Clearance"],
  date: [`>> ${new Date().toLocaleDateString("en-US", { weekday: "long", year: "numeric", month: "long", day: "numeric" })}`],
  matrix: [
    ">> Initiating Matrix Protocol...",
    "",
    "  01001000 01100101 01101100 01101100",
    "  01101111 00100000 01010111 01101111",
    "  01110010 01101100 01100100",
    "",
    "  >> Translation: Hello World",
    "  >> The Matrix has you, Arjun...",
  ],
}

const initialLines: TerminalLine[] = [
  { type: "system", content: "ARJUN_OS Terminal v4.2.1" },
  { type: "system", content: 'Type "help" for available commands.' },
  { type: "output", content: "" },
]

export function ProjectsTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>(initialLines)
  const [input, setInput] = useState("")
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const terminalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = useCallback(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [lines, scrollToBottom])

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase()

    const newLines: TerminalLine[] = [
      ...lines,
      { type: "input", content: cmd },
    ]

    if (trimmed === "clear") {
      setLines(initialLines)
      return
    }

    if (trimmed === "") {
      setLines(newLines)
      return
    }

    const response = commandResponses[trimmed]
    if (response) {
      response.forEach((line) => {
        newLines.push({ type: "output", content: line })
      })
    } else {
      newLines.push({
        type: "error",
        content: `Command not found: ${trimmed}. Type "help" for available commands.`,
      })
    }

    newLines.push({ type: "output", content: "" })
    setLines(newLines)
    setCommandHistory((prev) => [cmd, ...prev])
    setHistoryIndex(-1)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleCommand(input)
      setInput("")
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else {
        setHistoryIndex(-1)
        setInput("")
      }
    }
  }

  return (
    <section id="terminal" className="relative py-24 lg:py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          tag="// Access Point"
          title="Projects Terminal"
          subtitle='Interactive command interface. Type "help" to begin.'
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="max-w-3xl mx-auto"
        >
          {/* Terminal window */}
          <div className="glass rounded-lg neon-border overflow-hidden">
            {/* Title bar */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-red-500/70" />
                <div className="h-3 w-3 rounded-full bg-yellow-500/70" />
                <div className="h-3 w-3 rounded-full bg-emerald-500/70" />
              </div>
              <span className="font-mono text-[10px] text-muted-foreground uppercase tracking-wider">
                arjun@cyber-domain:~
              </span>
              <div className="w-16" />
            </div>

            {/* Terminal body */}
            <div
              ref={terminalRef}
              className="p-4 h-96 overflow-y-auto font-mono text-sm scanline cursor-text"
              onClick={() => inputRef.current?.focus()}
              role="log"
              aria-label="Terminal output"
            >
              {lines.map((line, i) => (
                <div key={i} className="leading-relaxed">
                  {line.type === "input" && (
                    <div className="text-foreground">
                      <span className="text-emerald-400">{"arjun@os"}</span>
                      <span className="text-muted-foreground">{":"}</span>
                      <span className="text-cyber-blue">{"~"}</span>
                      <span className="text-muted-foreground">{"$ "}</span>
                      {line.content}
                    </div>
                  )}
                  {line.type === "output" && (
                    <div className="text-muted-foreground whitespace-pre">
                      {line.content}
                    </div>
                  )}
                  {line.type === "error" && (
                    <div className="text-red-400">{line.content}</div>
                  )}
                  {line.type === "system" && (
                    <div className="text-cyber-blue">{line.content}</div>
                  )}
                </div>
              ))}

              {/* Input line */}
              <div className="flex items-center text-foreground">
                <span className="text-emerald-400">{"arjun@os"}</span>
                <span className="text-muted-foreground">{":"}</span>
                <span className="text-cyber-blue">{"~"}</span>
                <span className="text-muted-foreground">{"$ "}</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  className="flex-1 bg-transparent outline-none text-foreground caret-cyber-blue font-mono text-sm"
                  spellCheck={false}
                  autoComplete="off"
                  aria-label="Terminal input"
                />
              </div>
            </div>
          </div>

          {/* Quick commands */}
          <div className="mt-4 flex flex-wrap gap-2 justify-center">
            {["help", "projects", "skills", "contact", "social", "matrix"].map((cmd) => (
              <button
                key={cmd}
                onClick={() => {
                  handleCommand(cmd)
                  setInput("")
                }}
                className="px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-muted-foreground bg-secondary/50 rounded-sm border border-border hover:border-cyber-blue/30 hover:text-cyber-blue transition-all"
              >
                {cmd}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
