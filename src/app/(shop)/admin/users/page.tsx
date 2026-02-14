// https://tailwindcomponents.com/component/hoverable-table

import { redirect } from 'next/navigation';
import { getPaginatedUsers } from '@/src/actions';
import { UsersTable } from './ui/UsersTable';
import { Pagination, Title } from '@/src/components';

const UsersPage = async () => {
  const { code, ok, users = [] } = await getPaginatedUsers();

  if (code === 401) redirect('/auth/login');
  if (!ok) redirect('/');

  return (
    <>
      <Title title="Manteminiento de usuarios" />

      <div className="mb-10">
        <UsersTable users={users} />

        <Pagination totalPages={1} />
      </div>
    </>
  );
};

export default UsersPage;
