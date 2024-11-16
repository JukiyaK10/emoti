import { Inter } from 'next/font/google'
import { PostProvider } from "./context/PostContext"

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <PostProvider>
          {children}
        </PostProvider>
      </body>
    </html>
  )
}