'use client';

import { useEffect, useState } from 'react';

export default function OrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  const fetchOrders = async () => {
    const response = await fetch(
      `${process.env.API_URL}/orders`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            'token'
          )}`,
        },
      }
    );

    const data = await response.json();
    const ordersArray = Array.isArray(data)
      ? data
      : Array.isArray(data?.orders)
      ? data.orders
      : [];

    setOrders(ordersArray);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (
    id: number,
    status: string
  ) => {
    await fetch(
      `${process.env.API_URL}/orders/${id}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type':
            'application/json',
          Authorization: `Bearer ${localStorage.getItem(
            'token'
          )}`,
        },
        body: JSON.stringify({
          status,
        }),
      }
    );

    fetchOrders();
  };

  const deleteOrder = async (id: number) => {
    await fetch(
      `${process.env.API_URL}/orders/${id}`,
      {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${localStorage.getItem(
            'token'
          )}`,
        },
      }
    );

    fetchOrders();
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Orders
      </h1>

      <table className="w-full border bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 border">
              ID
            </th>

            <th className="p-3 border">
              Customer
            </th>

            <th className="p-3 border">
              Phone
            </th>

            <th className="p-3 border">
              Total
            </th>

            <th className="p-3 border">
              Status
            </th>

            <th className="p-3 border">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {Array.isArray(orders) && orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-3">#{order.id}</td>

              <td className="border p-3">{order.customer || order.fullName}</td>

              <td className="border p-3">{order.phone}</td>

              <td className="border p-3">MK {order.totalAmount ?? order.total}</td>

              <td className="border p-3">
                <span
                  className={`px-3 py-1 rounded text-white ${
                    order.status === 'PENDING'
                      ? 'bg-yellow-500'
                      : order.status === 'DELIVERED'
                      ? 'bg-green-600'
                      : 'bg-blue-600'
                  }`}
                >
                  {order.status}
                </span>
              </td>

              <td className="border p-3">{(order.items || []).length} items</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}