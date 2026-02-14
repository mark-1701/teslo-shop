import { redirect } from 'next/navigation';
import { auth } from '@/auth';

export default async function AdminLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  // ! Proteccion de rutas por role
  if (session?.user.role !== 'admin') redirect('/');
  return <>{children}</>;
}
