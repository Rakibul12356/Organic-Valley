import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Container } from '@components/common';
import { ProductPagination } from '@components/products';
import { ROUTES } from '@constants';

const ORDER_STATUS = {
  DELIVERED: 'Delivered',
  PENDING: 'Pending',
  CONFIRMED: 'Confirmed',
  CANCELLED: 'Cancelled',
};

const ORDER_FILTERS = ['All Orders', 'Pending', 'Confirmed', 'Delivered', 'Cancelled'];
const ORDERS_PER_PAGE = 2;

const ORDERS = [
  {
    id: 'FB-2024-001234',
    placedOn: 'Dec 20, 2024',
    status: ORDER_STATUS.DELIVERED,
    total: 300,
    note: '',
    timelineStep: 4,
    items: [
      {
        id: 'tomatoes-1',
        name: 'Fresh Tomatoes',
        farmer: "Rahim's Farm",
        quantity: 5,
        unitPrice: 45,
        subtotal: 225,
        image:
          'https://images.unsplash.com/photo-1592924357228-91a4daadcfea?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'FB-2024-001236',
    placedOn: 'Dec 15, 2024',
    status: ORDER_STATUS.PENDING,
    total: 120,
    note: 'Waiting for farmer confirmation',
    timelineStep: 1,
    items: [
      {
        id: 'broccoli-1',
        name: 'Fresh Broccoli',
        farmer: "Anika's Garden",
        quantity: 2,
        unitPrice: 55,
        subtotal: 110,
        image:
          'https://images.unsplash.com/photo-1587049352846-4a222e784d38?w=80&h=80&fit=crop',
      },
    ],
  },
  {
    id: 'FB-2024-001240',
    placedOn: 'Dec 10, 2024',
    status: ORDER_STATUS.CONFIRMED,
    total: 260,
    note: '',
    timelineStep: 2,
    items: [
      {
        id: 'lettuce-1',
        name: 'Fresh Lettuce',
        farmer: 'Green Valley Farm',
        quantity: 4,
        unitPrice: 30,
        subtotal: 120,
        image:
          'https://images.unsplash.com/photo-1566385101042-1a0aa0c1268c?w=80&h=80&fit=crop',
      },
    ],
  },
];

const statusBadgeClass = (status) => {
  if (status === ORDER_STATUS.DELIVERED) {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200';
  }
  if (status === ORDER_STATUS.PENDING) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200';
  }
  if (status === ORDER_STATUS.CONFIRMED) {
    return 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200';
  }
  return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200';
};

const timelineSteps = ['Order Placed', 'Confirmed', 'Shipped', 'Delivered'];

const OrdersPage = () => {
  const [activeFilter, setActiveFilter] = useState('All Orders');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredOrders = useMemo(() => {
    if (activeFilter === 'All Orders') return ORDERS;
    return ORDERS.filter((order) => order.status === activeFilter);
  }, [activeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / ORDERS_PER_PAGE));
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE,
  );

  const handleFilterChange = (event) => {
    setActiveFilter(event.target.value);
    setCurrentPage(1);
  };

  return (
    <>
      <Container className="py-4">
        <nav className="flex" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link to={ROUTES.HOME} className="text-gray-500 hover:text-primary-600">
                Home
              </Link>
            </li>
            <li>
              <i className="fas fa-chevron-right text-gray-400 text-xs" aria-hidden="true" />
            </li>
            <li className="text-gray-900 dark:text-white">My Orders</li>
          </ol>
        </nav>
      </Container>

      <Container className="py-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">My Orders</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Track and manage your orders</p>
          </div>

          <select
            value={activeFilter}
            onChange={handleFilterChange}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            aria-label="Filter orders by status"
          >
            {ORDER_FILTERS.map((filter) => (
              <option key={filter} value={filter}>
                {filter}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-6">
          {paginatedOrders.map((order) => (
            <article
              key={order.id}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-4 gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      Order #{order.id}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Placed on {order.placedOn}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusBadgeClass(order.status)}`}
                    >
                      <i
                        className={`fas ${order.status === ORDER_STATUS.PENDING ? 'fa-clock' : 'fa-check-circle'} mr-1`}
                        aria-hidden="true"
                      />
                      {order.status}
                    </span>
                    <span className="text-lg font-bold text-gray-900 dark:text-white">
                      ৳{order.total}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 mb-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 rounded-lg object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900 dark:text-white">{item.name}</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">By {item.farmer}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          Quantity: {item.quantity} kg • ৳{item.unitPrice}/kg
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900 dark:text-white">৳{item.subtotal}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4">
                  <h4 className="font-medium text-gray-900 dark:text-white mb-3">Order Status</h4>
                  <div className="flex flex-wrap items-center gap-2 text-sm">
                    {timelineSteps.map((step, index) => {
                      const isDone = index < order.timelineStep;
                      const isCurrent = index === order.timelineStep - 1;
                      return (
                        <div key={step} className="flex items-center gap-2">
                          <div
                            className={`flex items-center ${
                              isDone
                                ? 'text-green-600 dark:text-green-400'
                                : isCurrent
                                  ? 'text-yellow-600 dark:text-yellow-400'
                                  : 'text-gray-400'
                            }`}
                          >
                            <i
                              className={`fas ${isDone ? 'fa-check-circle' : isCurrent ? 'fa-clock' : 'fa-circle'} mr-1`}
                              aria-hidden="true"
                            />
                            <span>{step}</span>
                          </div>
                          {index < timelineSteps.length - 1 && (
                            <div
                              className={`w-6 h-0.5 ${isDone ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}
                            />
                          )}
                        </div>
                      );
                    })}
                  </div>
                  {order.note && (
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{order.note}</p>
                  )}
                </div>

                <div className="border-t border-gray-200 dark:border-gray-600 pt-4 flex flex-wrap gap-3">
                  {order.status === ORDER_STATUS.DELIVERED ? (
                    <>
                      <button
                        type="button"
                        className="flex items-center px-4 py-2 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition"
                      >
                        <i className="fas fa-download mr-2" aria-hidden="true" />
                        Download Receipt
                      </button>
                      <button
                        type="button"
                        className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition"
                      >
                        <i className="fas fa-star mr-2" aria-hidden="true" />
                        Write Review
                      </button>
                      <button
                        type="button"
                        className="flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg font-medium transition"
                      >
                        <i className="fas fa-redo mr-2" aria-hidden="true" />
                        Reorder
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      className="flex items-center px-4 py-2 border border-red-300 text-red-600 hover:bg-red-50 dark:hover:bg-red-900 rounded-lg font-medium transition"
                    >
                      <i className="fas fa-times mr-2" aria-hidden="true" />
                      Cancel Order
                    </button>
                  )}
                </div>
              </div>
            </article>
          ))}
        </div>

        {filteredOrders.length === 0 && (
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 mt-6 text-center">
            <p className="text-gray-600 dark:text-gray-400">No orders found for this filter.</p>
          </div>
        )}

        {filteredOrders.length > ORDERS_PER_PAGE && (
          <ProductPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        )}
      </Container>
    </>
  );
};

export default OrdersPage;
