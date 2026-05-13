import { getPayload } from 'payload';
import configPromise from '@payload-config';
import RegistrerSkyting from '../../../components/RegistrerSkyting';

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RegistrerPage({ params }: PageProps) {
  const { id } = await params;

  const payload = await getPayload({
    config: configPromise,
  });

  const event = await payload.findByID({
    collection: 'events',
    id: Number(id),
    overrideAccess: true,
  });

  return <RegistrerSkyting event={event} />;
}