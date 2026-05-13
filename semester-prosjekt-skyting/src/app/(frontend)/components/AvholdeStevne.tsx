'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Event } from '@/payload-types';

export default function AvholdeStevne({ event }: { event: Event }) {
  const router = useRouter();
  const formattedDate = new Date(event.date).toLocaleDateString('nb-NO');

  function avsluttStevne() {
    router.push('/archive');
  }

  return (
    <main className="convention-page">
      <div className="convention-wrapper">
        <div className="convention-header">
          <h1>
            Avholde stevne {event.id} {event.name}
          </h1>

          <p>Dato: {formattedDate}</p>
        </div>

        <div className="convention-grid two-columns">
          <ConventionCard title="Stevne oppsett">
            <button type="button" className="action-button">
              Rediger stevne
            </button>
          </ConventionCard>

          <ConventionCard title="Skyting">
            <Link
              href={`/convention/${event.id}/registrer`}
              className="action-button"
            >
              Registrer
            </Link>
          </ConventionCard>

          <ConventionCard title="Resultater">
            <Link href={`/archive/${event.id}`} className="action-button">
              Rapport
            </Link>
          </ConventionCard>

          <ConventionCard title="Etter stevnet">
            <button
              type="button"
              onClick={avsluttStevne}
              className="action-button danger-button"
            >
              Avslutt
            </button>
          </ConventionCard>
        </div>
      </div>
    </main>
  );
}

function ConventionCard({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section className="convention-card">
      <div className="convention-card-header">{title}</div>

      <div className="convention-card-content">{children}</div>
    </section>
  );
}