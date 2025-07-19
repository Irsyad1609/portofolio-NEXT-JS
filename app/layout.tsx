import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Irsyad Khoirul Anwar',
  description: 'Created by Irsyad Khoirul Anwar',
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icon.png" type="image/png" />
      </head>
      <body>{children}</body>
    </html>
  )
}
