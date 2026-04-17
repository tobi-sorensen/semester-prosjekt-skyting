import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="navbar">
      <h1>Jaktfelt</h1>
      <div className="links">
        <Link href="/">Hjem</Link>
        <Link href="create">Opprett</Link>
        <Link href="archive">Arkiv</Link>
        <Link href="login">Logg inn</Link>
      </div>
    </nav>
  );
}