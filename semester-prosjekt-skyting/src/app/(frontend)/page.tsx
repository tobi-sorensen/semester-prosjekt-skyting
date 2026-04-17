export default function HomePage() {
  return (
    <div className="page">
      <h2>Velkommen til Jaktfelt</h2>
      <p>Administrer skyting, resultater og medlemmer enkelt.</p>

      <div className="grid">
        <div className="card">
          <h3>Opprett skyting</h3>
          <p>Lag et nytt arrangement</p>
        </div>

        <div className="card">
          <h3>Se arkiv</h3>
          <p>Se tidligere resultater</p>
        </div>

      </div>
    </div>
  );
}
