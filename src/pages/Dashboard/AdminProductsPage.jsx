import { ADMIN_PRODUCTS, productStatusClass } from '@data/dashboard';

const AdminProductsPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold text-gray-900 dark:text-white">Products</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Manage all products on the platform
          </p>
        </div>
        <button
          type="button"
          className="inline-flex items-center justify-center px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
        >
          <i className="fas fa-plus mr-2" aria-hidden="true" />
          Add Product
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Product</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400 hidden sm:table-cell">Category</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell">Farmer</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Price</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400 hidden lg:table-cell">Stock</th>
                <th className="text-left px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Status</th>
                <th className="text-right px-5 py-3 font-medium text-gray-500 dark:text-gray-400">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {ADMIN_PRODUCTS.map((product) => (
                <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/30">
                  <td className="px-5 py-4 font-medium text-gray-900 dark:text-white">{product.name}</td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden sm:table-cell">
                    {product.category}
                  </td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden md:table-cell">
                    {product.farmer}
                  </td>
                  <td className="px-5 py-4 text-gray-900 dark:text-white font-medium whitespace-nowrap">
                    ৳{product.price}
                  </td>
                  <td className="px-5 py-4 text-gray-600 dark:text-gray-300 hidden lg:table-cell">
                    {product.stock}
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex px-2.5 py-1 rounded-full text-xs font-medium ${productStatusClass(product.status)}`}
                    >
                      {product.status}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-primary-600 dark:hover:text-primary-400"
                      aria-label={`Edit ${product.name}`}
                    >
                      <i className="fas fa-edit" aria-hidden="true" />
                    </button>
                    <button
                      type="button"
                      className="p-2 text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                      aria-label={`Delete ${product.name}`}
                    >
                      <i className="fas fa-trash" aria-hidden="true" />
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

export default AdminProductsPage;
