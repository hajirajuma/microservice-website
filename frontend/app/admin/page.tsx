"use client";

import { useEffect, useState } from 'react';

type Summary = {
  productsCount: number;
  ordersCount: number;
  customersCount: number;
  totalRevenue: number;
};

export default function AdminDashboard() {
  const [summary, setSummary] = useState<Summary>({
    productsCount: 0,
    ordersCount: 0,
    customersCount: 0,
    totalRevenue: 0,
  });

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const resp = await fetch(`${process.env.API_URL}/admin/summary`);
        const data = await resp.json();
        setSummary({
          productsCount: data.productsCount ?? 0,
          ordersCount: data.ordersCount ?? 0,
          customersCount: data.customersCount ?? 0,
          totalRevenue: data.totalRevenue ?? 0,
        });
      } catch (err) {
        // ignore — keep defaults
      }
    };

    fetchSummary();
  }, []);

  return (
    <div>
      <h1 className="text-4xl font-bold mb-8 text-neutral-950">
        Dashboard
      </h1>
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded shadow">
          <h2>Total Products</h2>
          <p className="text-3xl font-bold"> {summary.productsCount} </p>

        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2>Total Orders</h2>
          <p className="text-3xl font-bold"> {summary.ordersCount} </p>

        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2>Total Customers</h2>
          <p className="text-3xl font-bold"> {summary.customersCount} </p>

        </div>
        <div className="bg-white p-6 rounded shadow">
          <h2>Total Revenue</h2>
          <p className="text-3xl font-bold"> Mk{summary.totalRevenue.toLocaleString()} </p>

        </div>

      </div>
    </div>
  )
}