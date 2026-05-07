import { getPayload } from 'payload';
import config from '@/payload.config';
import { cookies } from 'next/headers';

export async function getUser() {
  const payload = await getPayload({
    config,
  });

  const cookieStore = await cookies();

  const token = cookieStore.get('payload-token')?.value;

  if (!token) {
    return null;
  }

  try {
    const { user } = await payload.auth({
      headers: new Headers({
        Authorization: `JWT ${token}`,
      }),
    });

    return user;
  } catch {
    return null;
  }
}