import { ContactForm } from "./components/contact-form"
import { Toaster } from "@/components/ui/toaster"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-950 via-black to-red-950 text-white flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-3xl flex-1 flex flex-col justify-center">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-light tracking-wide text-white mb-4">Website coming soon</h2>
          <p className="text-xl text-gray-300 text-balance max-w-2xl mx-auto">
            Custom signs, banners, vehicle wraps & large-format printing. Fast turnarounds, fair pricing.
          </p>
        </div>
        <ContactForm />
      </div>
      <footer className="w-full text-center py-6 text-gray-400">
        <a
          href="https://themarketinggenius.com"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-emerald-400 transition-colors"
        >
          TheMarketingGenius.com
        </a>
      </footer>
      <Toaster />
    </div>
  )
}
