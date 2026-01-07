import "./globals.css";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import TanStackProvider from "../components/TanStackProvider/TanStackProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#000" />
        <link rel="icon" href="/favicon.ico" /> 
        <title>NoteHub</title>
      </head>
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
