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

    const businessEmailHtml = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #000; border-bottom: 2px solid #ddd; padding-bottom: 10px;">New Quote Request</h2>
          <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
            <tr style="background-color: #f5f5f5;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; width: 35%;">First Name</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${firstName}</td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Last Name</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${lastName}</td>
            </tr>
            <tr style="background-color: #f5f5f5;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Email</td>
              <td style="padding: 12px; border: 1px solid #ddd;"><a href="mailto:${email}" style="color: #0066cc;">${email}</a></td>
            </tr>
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Phone</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${phone || "Not provided"}</td>
            </tr>
            <tr style="background-color: #f5f5f5;">
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold;">Company</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${company || "Not provided"}</td>
            </tr>
            ${file && file.size > 0 ? `
            <tr>
              <td style="padding: 12px; border: 1px solid #ddd; font-weight: bold; background-color: #f5f5f5;">Attachment</td>
              <td style="padding: 12px; border: 1px solid #ddd;">${file.name}</td>
            </tr>
            ` : ""}
          </table>
          <div style="margin-top: 20px;">
            <h3 style="color: #000; margin-bottom: 10px;">Project Details:</h3>
            <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #0066cc; border-radius: 4px;">
              <p style="margin: 0; white-space: pre-wrap;">${message}</p>
            </div>
          </div>
        </body>
      </html>
    `

    await resend.emails.send({
      from: "TheMarketingGenius <onboarding@resend.dev>",
      to: "anasqazza1@gmail.com",
      subject: "New Quote Request",
      html: businessEmailHtml,
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
    const err = error as any;
    if ("message" in err && err.message.includes("Missing API key")) {
      return { error: "Missing environment variable: RESEND_API_KEY" }
    }
    return { error: err?.message ?? "Failed to send email" }
  }
}
