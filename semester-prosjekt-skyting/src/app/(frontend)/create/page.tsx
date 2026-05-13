import { redirect } from 'next/navigation';
import { getUser } from '@/lib/getUser';
import JaktfeltForm from '../components/JaktFeltForm';

export default async function CreatePage() {
  const user = await getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <div className="page">
      <h2>Opprett nytt jaktfeltstevne</h2>

      <p>Innlogget som: {user.name}</p>

      <JaktfeltForm />
    </div>
  );
}