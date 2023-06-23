import './globals.css'
import { Exo } from 'next/font/google'

const exo = Exo({ subsets: ['latin'] })

export const metadata = {
  title: 'Pokedex',
  description: 'Browse all your favorite Pokemon!',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={exo.className}>{children}</body>
    </html>
  )
}
