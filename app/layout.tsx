import type { ReactNode } from "react"
import { Geist } from 'next/font/google'
import "./globals.css"

// Configure Geist font
const geist = Geist({
  subsets: ['latin'],
})

export default function RootLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <html lang="en" className={geist.className}>
      <body>{children}</body>
    </html>
  )
}

export const metadata = {
      generator: 'v0.app'
    };
