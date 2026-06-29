import { ADMIN_USERS, userStatusClass } from '@data/dashboard';

const AdminUsersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Users</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage customers and farmers
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="search"
            placeholder="Search users..."
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
          />
          <select
            className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
            aria-label="Filter users by role"
            defaultValue="all"
          >
            <option value="all">All Roles</option>
            <option value="customer">Customer</option>
            <option value="farmer">Farmer</option>
          </select>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Name</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Email</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Role</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Joined</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {ADMIN_USERS.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center shrink-0">
                        <span className="text-sm font-semibold text-primary-700 dark:text-primary-300">
                          {user.name.charAt(0)}
                        </span>
                      </div>
                      <span className="font-medium text-gray-900 dark:text-white">{user.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                    {user.email}
                  </td>
                  <td className="px-5 py-4">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300">
                      {user.role}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                    {user.joined}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${userStatusClass(user.status)}`}
                    >
                      {user.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`View ${user.name}`}
                    >
                      <i className="fas fa-eye" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                      aria-label={`Disable ${user.name}`}
                    >
                      <i className="fas fa-ban" aria-hidden="true" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminUsersPage;
