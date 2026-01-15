import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub",
  description: "Notes application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <TanStackProvider>
          <Header />
          <main className="main">{children}</main>
          <Footer />
        </TanStackProvider>
      </body>
    </html>
  );
}
