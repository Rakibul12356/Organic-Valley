import { Link } from 'react-router-dom';
import { ADMIN_ROUTES } from '@constants';
import { DASHBOARD_STATS, RECENT_ORDERS, orderStatusClass } from '@data/dashboard';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {DASHBOARD_STATS.map((stat) => (
          <div
            key={stat.id}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 sm:p-6"
          >
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                <p className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mt-1">
                  {stat.value}
                </p>
                <p className="text-sm text-green-600 dark:text-green-400 mt-2">
                  <i className="fas fa-arrow-up mr-1" aria-hidden="true" />
                  {stat.change} from last month
                </p>
              </div>
              <div className={`${stat.color} p-3 rounded-xl shrink-0`}>
                <i className={`fas ${stat.icon} text-white text-lg`} aria-hidden="true" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-5 sm:p-6 border-b border-gray-200 dark:border-gray-700">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Orders</h2>
            <Link
              to={ADMIN_ROUTES.ORDERS}
              className="text-sm text-primary-600 dark:text-primary-400 hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Customer</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Product</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                  <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {RECENT_ORDERS.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                    <td className="px-5 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                      {order.id}
                    </td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300">{order.customer}</td>
                    <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                      {order.product}
                    </td>
                    <td className="px-5 py-4 text-gray-900 dark:text-white font-medium whitespace-nowrap">
                      ৳{order.amount}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${orderStatusClass(order.status)}`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Actions</h2>
          <div className="space-y-3">
            <Link
              to={ADMIN_ROUTES.PRODUCTS}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
            >
              <div className="bg-primary-100 dark:bg-primary-900 p-2.5 rounded-lg">
                <i className="fas fa-box text-primary-600 dark:text-primary-400" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Manage Products</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Add, edit, or remove products</p>
              </div>
            </Link>
            <Link
              to={ADMIN_ROUTES.ORDERS}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
            >
              <div className="bg-blue-100 dark:bg-blue-900 p-2.5 rounded-lg">
                <i className="fas fa-shopping-bag text-blue-600 dark:text-blue-400" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">View Orders</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Track and manage all orders</p>
              </div>
            </Link>
            <Link
              to={ADMIN_ROUTES.USERS}
              className="flex items-center gap-3 p-4 rounded-xl border border-gray-200 dark:border-gray-700 hover:border-primary-300 dark:hover:border-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/20 transition"
            >
              <div className="bg-purple-100 dark:bg-purple-900 p-2.5 rounded-lg">
                <i className="fas fa-users text-purple-600 dark:text-purple-400" aria-hidden="true" />
              </div>
              <div>
                <p className="font-medium text-gray-900 dark:text-white">Manage Users</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Customers and farmers</p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
