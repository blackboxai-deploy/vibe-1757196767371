import type { Metadata } from "next";
import { Inter, Amiri } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({ subsets: ["latin"] });
const amiri = Amiri({ 
  subsets: ["arabic", "latin"],
  weight: ["400", "700"],
  variable: "--font-amiri"
});

export const metadata: Metadata = {
  title: "خفاجي الديك - أثاث فاخر وتصميم داخلي",
  description: "اكتشف مجموعتنا الفاخرة من الأثاث العصري والكلاسيكي. خفاجي الديك - جودة عالية وتصميم أنيق لمنزل أحلامك",
  keywords: "أثاث، أثاث فاخر، غرف نوم، صالونات، مطابخ، مكاتب، خفاجي الديك",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl" className={`${amiri.variable}`}>
      <body className={`${inter.className} antialiased bg-neutral-50`}>
        <CartProvider>
          {children}
          <Toaster position="top-center" />
        </CartProvider>
      </body>
    </html>
  );
}