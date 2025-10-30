"use client"
import Image from "next/image"
import { SubmitButton } from "./submit-button"
import { toast } from "@/components/ui/use-toast"
import { sendEmail } from "../actions/send-email"

export function ContactForm() {
  async function handleSubmit(formData: FormData) {
    const result = await sendEmail(formData)

    if (result.success) {
      toast({
        title: "Success",
        description: result.success,
      })
    } else {
      toast({
        variant: "destructive",
        title: "Error",
        description: result.error,
      })
    }
  }

  return (
    <form action={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-4">
          <label htmlFor="firstName" className="block text-xl text-gray-400">
            First name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            placeholder="Enter your first name"
            required
            className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
          />
        </div>

        <div className="space-y-4">
          <label htmlFor="lastName" className="block text-xl text-gray-400">
            Last name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            placeholder="Enter your last name"
            required
            className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
          />
        </div>
      </div>

      <div className="space-y-4">
        <label htmlFor="email" className="block text-xl text-gray-400">
          Email address <span className="text-gray-500">(required)</span>
        </label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          required
          className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
        />
      </div>

      <div className="space-y-4">
        <label htmlFor="phone" className="block text-xl text-gray-400">
          Phone number <span className="text-gray-500">(optional)</span>
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          placeholder="Enter your phone number"
          className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
        />
      </div>

      <div className="space-y-4">
        <label htmlFor="company" className="block text-xl text-gray-400">
          Company <span className="text-gray-500">(optional)</span>
        </label>
        <input
          type="text"
          id="company"
          name="company"
          placeholder="Enter your company name"
          className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600"
        />
      </div>

      <div className="space-y-4">
        <label htmlFor="file" className="block text-xl text-gray-400">
          Attach files <span className="text-gray-500">(pdf, jpg, png, svg, ai; max 25 MB)</span>
        </label>
        <input
          type="file"
          id="file"
          name="file"
          accept=".pdf,.jpg,.jpeg,.png,.svg,.ai"
          className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-gray-800 file:text-gray-300 hover:file:bg-gray-700 file:cursor-pointer"
        />
      </div>

      <div className="space-y-4">
        <label htmlFor="message" className="block text-xl text-gray-400">
          What do you need designed/printed? <span className="text-gray-500">(required)</span>
        </label>
        <textarea
          id="message"
          name="message"
          placeholder="Tell us about your project"
          required
          rows={6}
          className="w-full bg-[#111] rounded-xl p-4 text-xl border-0 focus:ring-1 focus:ring-gray-400 placeholder:text-gray-600 resize-none"
        />
      </div>

      <div className="space-y-4">
        <SubmitButton />
        <p className="text-sm text-gray-500 text-center">We don't sell or share your data.</p>
      </div>

      <div className="flex items-center justify-center gap-2 text-gray-400">
        Powered by
        <a href="https://resend.com" target="_blank" rel="noopener noreferrer">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Resend_wordmark_dark-i35Qj7S9FUiAKsOo5C24TYfVgCDrKL.svg"
            alt="Resend"
            width={75}
            height={24}
            className="relative top-[1px]"
          />
        </a>
      </div>
    </form>
  )
}
