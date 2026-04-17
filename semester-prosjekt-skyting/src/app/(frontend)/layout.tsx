import "./styles.scss";
import Navbar from "./components/Navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="no">
      <body>
        <Navbar />
        <main className="container">{children}</main>
      </body>
    </html>
  );
}
