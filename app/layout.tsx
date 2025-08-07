import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Suspense } from 'react'
import './globals.css'
import Loading from './loading'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'WhatsApp Web',
  description: 'WhatsApp Web Clone with real-time messaging',
  icons: {
    icon: '/favicon.ico',
  },
  // Remove any v0 references
  generator: 'WhatsApp Web Clone',
  applicationName: 'WhatsApp Web',
  referrer: 'origin-when-cross-origin',
  keywords: ['whatsapp', 'web', 'messaging', 'chat'],
  authors: [{ name: 'WhatsApp Web Clone' }],
  creator: 'WhatsApp Web Clone',
  publisher: 'WhatsApp Web Clone',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        {/* Additional meta tags to override any v0 branding */}
        <meta name="generator" content="WhatsApp Web Clone" />
        <meta name="application-name" content="WhatsApp Web" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Aggressive watermark removal */
            [data-v0-watermark],
            [class*="v0"],
            [id*="v0"],
            div[style*="position: fixed"][style*="bottom"],
            *[aria-label*="v0"],
            *[title*="v0"] {
              display: none !important;
              visibility: hidden !important;
              opacity: 0 !important;
              position: absolute !important;
              left: -9999px !important;
              top: -9999px !important;
              width: 0 !important;
              height: 0 !important;
              overflow: hidden !important;
              z-index: -9999 !important;
            }
          `
        }} />
      </head>
      <body className={`${inter.className} bg-gray-100`}>
        <Suspense fallback={<Loading />}>
          {children}
        </Suspense>
      </body>
    </html>
  )
}
