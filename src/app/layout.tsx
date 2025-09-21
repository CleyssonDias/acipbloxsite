import type { Metadata } from "next";
import "./globals.css";
import Header from "./_components/Header";

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
      </body>
    </html>
  );
}
