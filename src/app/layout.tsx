import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";
import Footer from "./_components/Footer";

export const metadata: Metadata = {
  title: "Acipblox - A loja mas barata do brasil",
  description: "Compre robux barato! Com segurança!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <body
        className={`antialiased`}
      >
        <Header />
          {children}
        <Footer />
      </body>
    </html>
  );
}
