import { getPayload } from 'payload';
import configPromise from '@payload-config';
import AvholdeStevne from '../../components/AvholdeStevne';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function ConventionPage({ params }: PageProps) {
  const { id } = await params;

  const payload = await getPayload({
    config: configPromise,
  });

  const event = await payload.findByID({
    collection: 'events',
    id: Number(id),
    overrideAccess: true,
  });

  if (!event) {
    return <main className="p-8">Fant ikke stevnet.</main>;
  }

  return <AvholdeStevne event={event} />;
}