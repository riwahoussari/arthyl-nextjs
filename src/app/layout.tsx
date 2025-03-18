import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import LenisScrollWrapper from "../components/global/LenisScrollWrapper";

export const metadata: Metadata = {
  title: "ARTHYL - PLEXIGLASS ARTIST",
  description:
    "The first plexiglass artist in the middle east, creating art peices for visioners, leaders and entrepreneurs",
};

const COLS_NUMB = 7;
const MD_COLS_NUMB = 5;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {/* page transition animation */}
        <div className="page-transition-container fixed z-20 flex h-dvh w-full">
          {Array(COLS_NUMB)
            .fill("")
            .map((_, i) => (
              <div key={_ + i} className={`column h-full w-full bg-black ${((i < COLS_NUMB - MD_COLS_NUMB) && " hidden md:block")}`}/>
            ))}
        </div>
        <LenisScrollWrapper>
          <Navbar />

          <main className="lg:rounded-b-5xl xl:rounded-b-6xl z-1 bg-beige md:rounded-b-4xl max-w-dvw relative min-h-dvh overflow-clip rounded-b-3xl pt-12 text-black lg:pt-14">
            {children}
          </main>
          <Footer />
        </LenisScrollWrapper>
      </body>
    </html>
  );
}
