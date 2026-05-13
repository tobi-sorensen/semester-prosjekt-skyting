'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

type PayloadCreateResponse = {
  doc: {
    id: number;
  };
};

export default function JaktFeltForm() {
  const router = useRouter();

  const [stevneNavn, setStevneNavn] = useState('');
  const [dato, setDato] = useState('');
  const [gren, setGren] = useState('jaktfelt');
  const [rounds, setRounds] = useState(0);

  const isValid =
    stevneNavn.trim().length > 0 &&
    dato.trim().length > 0 &&
    gren.trim().length > 0;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isValid) {
      alert('Fyll inn navn, dato og gren.');
      return;
    }

    const res = await fetch('/api/events', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: stevneNavn,
        date: dato,
        discipline: gren,
        rounds,
      }),
    });

    if (!res.ok) {
      alert('Kunne ikke opprette stevne');
      return;
    }

    const event = (await res.json()) as PayloadCreateResponse;

    router.push(`/convention/${event.doc.id}`);
  };

  return (
  <form onSubmit={handleSubmit} className="create-form">
    <div className="create-header">
      <h1>Opprett nytt jaktfeltstevne</h1>

      <p>
        Stevnet opprettes først. Skyting, lag og resultater håndteres etterpå.
      </p>
    </div>

    <section className="create-card">
      <h2>Stevneinformasjon</h2>

      <div className="create-grid">
        <div className="create-field create-field-wide">
          <label>Navn på stevne</label>

          <input
            type="text"
            value={stevneNavn}
            onChange={(e) => setStevneNavn(e.target.value)}
            placeholder="Eks: Test"
            required
          />
        </div>

        <div className="create-field">
          <label>Dato</label>

          <input
            type="date"
            value={dato}
            onChange={(e) => setDato(e.target.value)}
            required
          />
        </div>

        <div className="create-field">
          <label>Gren</label>

          <select
            value={gren}
            onChange={(e) => setGren(e.target.value)}
          >
            <option value="jaktfelt">Jaktfelt</option>
          </select>
        </div>
      </div>
    </section>

    <div className="create-actions">
      <button type="submit" disabled={!isValid}>
        Opprett stevne
      </button>
    </div>
  </form>
);
}