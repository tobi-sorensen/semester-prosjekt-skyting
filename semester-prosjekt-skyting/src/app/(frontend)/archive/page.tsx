import Link from 'next/link'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

export default async function ArchivePage() {
  const payload = await getPayload({
    config: configPromise,
  })

  const events = await payload.find({
    collection: 'events',
    limit: 50,
    sort: '-createdAt',
  })

  return (
    <main className="container">
      <h1>Arkiv</h1>

      <div className="card">
        {events.docs.length === 0 && <p>Ingen stevner funnet.</p>}

        {events.docs.map((event) => (
          <div key={event.id} className="archive-row">
            <div>
              <strong>{event.name}</strong>
              <p>{new Date(event.date).toLocaleDateString('nb-NO')}</p>
            </div>

            <Link href={`/archive/${event.id}`} className="blue-button">
              Se resultater
            </Link>
          </div>
        ))}
      </div>
    </main>
  )
}