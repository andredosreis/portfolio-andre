import type { Metadata } from 'next'
import './globals.css'
import { Inter, JetBrains_Mono } from 'next/font/google'
const inter = Inter({ subsets: ['latin'], variable: '--font-sans', display: 'swap' })
const mono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono', display: 'swap' })
export const metadata: Metadata = {
  title: 'André dos Reis — Full‑Stack Developer',
  description: 'Crio produtos digitais rápidos, acessíveis e orientados a resultados. Baseado em Braga, PT.',
  metadataBase: new URL('https://portfolio-exemplo.dev'),
  icons: { icon: '/favicon.ico' },
}
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-PT" className="dark" suppressHydrationWarning>
      <body className={`${inter.variable} ${mono.variable}`}>{children}</body>
    </html>
  )
}
