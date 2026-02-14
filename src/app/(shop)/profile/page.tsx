import { redirect } from 'next/navigation';
import { auth } from '@/auth';
import { Title } from '@/src/components';

const ProfilePage = async () => {
  const session = await auth();
  if (!session?.user) return redirect('/');

  return (
    <div>
      <Title title="Perfil" />
      <pre>{JSON.stringify(session.user, null, 2)}</pre>
    </div>
  );
};

export default ProfilePage;
