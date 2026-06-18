'use client';

import { useEffect, useState } from 'react';

export default function CustomersPage() {
  const [customers, setCustomers] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const [customersResp, ordersResp] = await Promise.all([
        fetch(`${process.env.API_URL}/customers`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }),
        fetch(`${process.env.API_URL}/orders`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        }),
      ]);

      const customersData = await customersResp.json();
      const ordersData = await ordersResp.json();

      setCustomers(Array.isArray(customersData) ? customersData : []);
      setOrders(Array.isArray(ordersData) ? ordersData : []);
    } catch (err) {
      setCustomers([]);
      setOrders([]);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h1 className="text-3xl font-bold">
          Customers
        </h1>
      </div>

      <table className="w-full border bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-3">
              ID
            </th>

            <th className="border p-3">
              Email
            </th>

            <th className="border p-3">
              Role
            </th>

            <th className="border p-3">
              Orders
            </th>

            <th className="border p-3">
              Total Spent
            </th>

            <th className="border p-3">
              Actions
            </th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => {
            const userOrders = orders.filter((o) => o.userId === customer.id);
            const ordersCount = userOrders.length;
            const totalSpent = userOrders.reduce((s, o) => s + (o.totalAmount || o.total || 0), 0);

            return (
              <tr key={customer.id}>
                <td className="border p-3">{customer.id}</td>

                <td className="border p-3">{customer.email}</td>

                <td className="border p-3">
                  <span
                    className={`px-3 py-1 rounded text-white ${
                      customer.role === 'ADMIN' ? 'bg-red-600' : 'bg-green-600'
                    }`}
                  >
                    {customer.role}
                  </span>
                </td>

                <td className="border p-3">{ordersCount}</td>

                <td className="border p-3">MK {totalSpent.toLocaleString()}</td>

                <td className="border p-3">—</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}