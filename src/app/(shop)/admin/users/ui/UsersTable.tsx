'use client';

import { changeUserRole } from '@/src/actions';
import type { User } from '@/src/interfaces';

type UsersTableProps = {
  users: User[];
};

export const UsersTable = ({ users }: UsersTableProps) => {
  return (
    <table className="min-w-full">
      <thead className="border-bgender/men bg-gray-200">
        <tr>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            Email
          </th>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            Nombre completo
          </th>
          <th
            scope="col"
            className="px-6 py-4 text-left text-sm font-medium text-gray-900"
          >
            Role
          </th>
        </tr>
      </thead>
      <tbody>
        {users.map(user => (
          <tr
            key={user.id}
            className="border-b bg-white transition duration-300 ease-in-out
              hover:bg-gray-100"
          >
            <td
              className="px-6 py-4 text-sm font-medium whitespace-nowrap
                text-gray-900"
            >
              {user.name}
            </td>
            <td
              className="px-6 py-4 text-sm font-light whitespace-nowrap
                text-gray-900"
            >
              {user.email}
            </td>
            <td
              className="px-6 py-4 text-sm font-light whitespace-nowrap
                text-gray-900"
            >
              <select
                name=""
                id=""
                value={user.role}
                className="w-full p-2 text-sm text-gray-900"
                onChange={e => changeUserRole(user.id, e.target.value)}
              >
                <option value="admin">Admin</option>
                <option value="user">User</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
