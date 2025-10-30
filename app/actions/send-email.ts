"use server"

import { Resend } from "resend"

export async function sendEmail(formData: FormData) {
  try {
    const resend = new Resend(process.env.RESEND_API_KEY)

    const firstName = formData.get("firstName") as string
    const lastName = formData.get("lastName") as string
    const email = formData.get("email") as string
    const phone = formData.get("phone") as string
    const company = formData.get("company") as string
    const message = formData.get("message") as string
    const file = formData.get("file") as File | null

    if (!firstName || !lastName || !email || !message) {
      return { error: "Required fields are missing" }
    }

    if (file && file.size > 25 * 1024 * 1024) {
      return { error: "File size must be less than 25 MB" }
    }

    let attachments = undefined
    if (file && file.size > 0) {
      const buffer = await file.arrayBuffer()
      attachments = [
        {
          filename: file.name,
          content: Buffer.from(buffer),
        },
      ]
    }

    await resend.emails.send({
      from: "TheMarketingGenius <onboarding@resend.dev>",
      to: "anasqazza1@gmail.com",
      subject: "New Quote Request",
      text: `
        First Name: ${firstName}
        Last Name: ${lastName}
        Email: ${email}
        Phone: ${phone || "Not provided"}
        Company: ${company || "Not provided"}
        
        What they need: ${message}
      `,
      attachments,
    })

    await resend.emails.send({
      from: "TheMarketingGenius <onboarding@resend.dev>",
      to: email,
      subject: "Thanks—got your request",
      text: `Hi ${firstName},

Thanks for reaching out to TheMarketingGenius. We'll review your details and reply within 1 business day.

If it's urgent, call (xxx) xxx-xxxx.

—Team TMG`,
    })

    return { success: "Quote request sent successfully! Check your email for confirmation." }
  } catch (error) {
    if ("message" in error && error.message.includes("Missing API key")) {
      return { error: "Missing environment variable: RESEND_API_KEY" }
    }
    return { error: error.message ?? "Failed to send email" }
  }
}
