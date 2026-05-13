import { notFound } from 'next/navigation'
import { getPayload } from 'payload'
import configPromise from '@payload-config'

type PageProps = {
  params: Promise<{
    id: string
  }>
}

export default async function ArchiveDetailPage({ params }: PageProps) {
  const { id } = await params
  const eventId = Number(id)

  if (!Number.isFinite(eventId)) {
    notFound()
  }

  const payload = await getPayload({
    config: configPromise,
  })

  const event = await payload.findByID({
    collection: 'events',
    id: eventId,
    overrideAccess: true,
  })

  const results = await payload.find({
    collection: 'results',
    limit: 100,
    where: {
      event: {
        equals: Number(id),
      },
    },
    sort: '-total',
  })

  return (
    <main className="container">
      <h1>Resultater - {event.name}</h1>

      <div className="table-scroll">
        <table className="dark-score-table">
          <thead>
            <tr>
              <th>Plass</th>
              <th>Navn</th>
              <th>Klasse</th>
              <th>Lag</th>
              <th>1</th>
              <th>1 I</th>
              <th>2</th>
              <th>2 I</th>
              <th>3</th>
              <th>3 I</th>
              <th>4</th>
              <th>4 I</th>
              <th>5</th>
              <th>5 I</th>
              <th>6</th>
              <th>6 I</th>
              <th>Sum</th>
            </tr>
          </thead>

          <tbody>
            {results.docs.map((result, index) => (
              <tr key={result.id}>
                <td>{index + 1}</td>
                <td>{result.shooterName}</td>
                <td>{result.class}</td>
                <td>{result.team}</td>
                <td>{result.post1}</td>
                <td>{result.inner1}</td>
                <td>{result.post2}</td>
                <td>{result.inner2}</td>
                <td>{result.post3}</td>
                <td>{result.inner3}</td>
                <td>{result.post4}</td>
                <td>{result.inner4}</td>
                <td>{result.post5}</td>
                <td>{result.inner5}</td>
                <td>{result.post6}</td>
                <td>{result.inner6}</td>
                <td>
                  <strong>{result.total}</strong>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  )
}