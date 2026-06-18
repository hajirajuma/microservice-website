import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6">
        <h1 className="text-2xl font-bold mb-10">Admin Panel</h1>
        <nav className="space-y-4">
          <Link href="/admin" className="block">
            Dashboard
          </Link>
          <Link href="/admin/admin.products" className="block">
            Products
          </Link>
          <Link href="/admin/orders" className="block">
            Orders
          </Link>
          <Link href="/admin/customers" className="block">
            Customers
          </Link>
        </nav>
      </aside>
      {/* Main Content */}
      <main className="flex-1 p-8 bg-gray-100">{children}</main>
    </div>
  );
}