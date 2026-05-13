import Link from "next/link";

export default function HomePage() {
  return (
    <div className="page">
      <h2>Velkommen til Jaktfelt</h2>
      <Link className="card" href="/create">Opprett</Link>
      <Link className="card" href="/archive">Arkiv</Link>
    </div>
  );
}
