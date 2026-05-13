import Link from 'next/link';
import { getPayload } from 'payload';
import configPromise from '@payload-config';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RapportPage({ params }: PageProps) {
  const { id } = await params;

  const payload = await getPayload({
    config: configPromise,
  });

  const event = await payload.findByID({
    collection: 'events',
    id: Number(id),
    overrideAccess: true,
  });

  return (
    <main className="stevne-subpage">
      <div className="top-row">
        <h1>
          {event.id} - {event.name}
        </h1>

        <Link href={`/convention/${event.id}`} className="blue-button">
          Tilbake
        </Link>
      </div>

      <div className="report-box">
        <div className="report-toolbar">
          <div className="search-box">
            <span>🔍</span>
            <input placeholder="Søk..." />
          </div>

          <button className="light-button">Eksport til Excel</button>
        </div>

        <div className="filter-row">
          <span>Klasse ✖</span>
        </div>

        <table className="report-table">
          <thead>
            <tr>
              <Th></Th>
              <Th>Plass</Th>
              <Th>Navn</Th>
              <Th>Klubb</Th>
              <Th>Klasse</Th>
              <Th>Serier</Th>
              <Th>Sum</Th>
              <Th>SF1</Th>
              <Th>SF2</Th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={9} className="empty-row">
                Ingen poster tilgjengelig.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </main>
  );
}

function Th({ children }: { children?: React.ReactNode }) {
  return <th>{children}</th>;
}