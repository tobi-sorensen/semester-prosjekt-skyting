import { redirect } from 'next/navigation';
import { getUser } from '@/lib/getUser';

export default async function CreatePage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="page">
      <h2>Opprett ny skyting</h2>

      <p>Innlogget som: {user.name}</p>
    </div>
  );
}