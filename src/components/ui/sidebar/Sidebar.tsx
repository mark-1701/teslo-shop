import { auth } from '@/auth';
import { SidebarItems } from './SidebarItems';

export const Sidebar = async () => {
  const session = await auth();
  const isAuthenticated = !!session?.user;
  const isAdmin = session?.user.role === 'admin';

  return <SidebarItems isAdmin={isAdmin} isAuthenticated={isAuthenticated} />;
};
