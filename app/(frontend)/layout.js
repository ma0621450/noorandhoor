import { Montserrat, Abhaya_Libre, Cinzel, Josefin_Sans } from "next/font/google";
import "../globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
});

const abhayaLibre = Abhaya_Libre({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-abhaya-libre",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cinzel",
});

const josefinSans = Josefin_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-josefin-sans",
});

export const metadata = {
  title: "Noor and Hoor",
  description: "Noor and Hoor is a platform for buying and selling properties",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${montserrat.variable} ${abhayaLibre.variable} ${cinzel.variable} ${josefinSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        <main className="flex-1 w-full overflow-x-clip bg-[#111111]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
