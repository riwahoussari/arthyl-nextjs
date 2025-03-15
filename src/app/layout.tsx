import type { Metadata } from "next"
import "./globals.css"
import Navbar from "@/components/Navbar/Navbar"
import Footer from "@/components/Footer/Footer"
import LenisScrollWrapper from "../../LenisScrollWrapper"

export const metadata: Metadata = {
  title: "ARTHYL - PLEXIGLASS ARTIST",
  description:
    "The first plexiglass artist in the middle east, creating art peices for visioners, leaders and entrepreneurs",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>
        <LenisScrollWrapper>
          <Navbar />

          <main className="lg:rounded-b-5xl xl:rounded-b-6xl relative z-1 min-h-dvh rounded-b-3xl bg-beige pt-12 text-black md:rounded-b-4xl lg:pt-14 max-w-dvw overflow-clip">
            {children}
          </main>
          <Footer />
          {/* <ScrollRestoration /> */}
        </LenisScrollWrapper>
      </body>
    </html>
  )
}
