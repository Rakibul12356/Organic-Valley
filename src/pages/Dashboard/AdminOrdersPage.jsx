import { RECENT_ORDERS, orderStatusClass } from '@data/dashboard';

const AdminOrdersPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Orders</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            View and manage customer orders
          </p>
        </div>
        <select
          className="px-4 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 dark:bg-gray-700 dark:text-white text-sm"
          aria-label="Filter orders by status"
          defaultValue="all"
        >
          <option value="all">All Orders</option>
          <option value="pending">Pending</option>
          <option value="confirmed">Confirmed</option>
          <option value="delivered">Delivered</option>
          <option value="cancelled">Cancelled</option>
        </select>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Order ID</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Customer</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Product</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Date</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Amount</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
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
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden sm:table-cell whitespace-nowrap">
                    {order.date}
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
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`View order ${order.id}`}
                    >
                      <i className="fas fa-eye" aria-hidden="true" />
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

export default AdminOrdersPage;
