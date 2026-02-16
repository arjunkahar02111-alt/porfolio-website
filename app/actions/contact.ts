"use server"

import { Resend } from "resend"

const RECIPIENT_EMAIL = "kahararjun537@gmail.com"

export async function sendContactMessage(formData: {
  name: string
  email: string
  message: string
}) {
  const { name, email, message } = formData

  if (!name || !email || !message) {
    return { success: false, error: "All fields are required." }
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  if (!emailRegex.test(email)) {
    return { success: false, error: "Invalid email address." }
  }

  if (message.length > 5000) {
    return { success: false, error: "Message too long (max 5000 characters)." }
  }

  try {
    const apiKey = process.env.RESEND_API_KEY
    console.log("[v0] RESEND_API_KEY exists:", !!apiKey)
    console.log("[v0] RESEND_API_KEY length:", apiKey?.length)
    
    if (!apiKey) {
      return { success: false, error: "Email service not configured. Missing API key." }
    }
    
    const resend = new Resend(apiKey)
    console.log("[v0] Sending email to:", RECIPIENT_EMAIL, "from:", name, email)
    const result = await resend.emails.send({
      from: "Contact Form <onboarding@resend.dev>",
      to: RECIPIENT_EMAIL,
      subject: `New message from ${name}`,
      replyTo: email,
      html: `
        <div style="font-family: monospace; background: #0a0e1a; color: #e0e6f0; padding: 32px; border-radius: 8px;">
          <h2 style="color: #00d4ff; margin-bottom: 24px; font-size: 18px;">NEW TRANSMISSION RECEIVED</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 16px 8px 0; color: #6b7a99; font-size: 13px; vertical-align: top;">FROM</td>
              <td style="padding: 8px 0; color: #e0e6f0; font-size: 14px;">${name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 16px 8px 0; color: #6b7a99; font-size: 13px; vertical-align: top;">EMAIL</td>
              <td style="padding: 8px 0; color: #e0e6f0; font-size: 14px;"><a href="mailto:${email}" style="color: #00d4ff;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 8px 16px 8px 0; color: #6b7a99; font-size: 13px; vertical-align: top;">MESSAGE</td>
              <td style="padding: 8px 0; color: #e0e6f0; font-size: 14px; white-space: pre-wrap;">${message.replace(/</g, "&lt;").replace(/>/g, "&gt;")}</td>
            </tr>
          </table>
          <hr style="border: none; border-top: 1px solid #1a2235; margin: 24px 0;" />
          <p style="color: #6b7a99; font-size: 11px;">Sent from Arjun's Cyber Domain Portfolio</p>
        </div>
      `,
    })

    console.log("[v0] Resend response:", JSON.stringify(result))
    if (result.error) {
      console.error("[v0] Resend error:", JSON.stringify(result.error))
      return { success: false, error: result.error.message || "Email service error." }
    }
    return { success: true }
  } catch (error: unknown) {
    console.error("[v0] Failed to send email:", error)
    const errorMessage = error instanceof Error ? error.message : String(error)
    console.error("[v0] Error details:", errorMessage)
    return { success: false, error: `Failed to send: ${errorMessage}` }
  }
}
