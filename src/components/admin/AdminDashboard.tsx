"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { Product } from "@prisma/client";
import { Pencil, Plus, Trash2, LogOut } from "lucide-react";
import { formatCategory } from "@/lib/constants";
import AdminProductForm from "./AdminProductForm";
import Button from "@/components/ui/Button";

type AdminDashboardProps = {
  initialProducts: Product[];
};

export default function AdminDashboard({ initialProducts }: AdminDashboardProps) {
  const [products, setProducts] = useState(initialProducts);
  const [editing, setEditing] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  async function refreshProducts() {
    const res = await fetch("/api/products");
    const data = await res.json();
    setProducts(data);
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this product?")) return;

    const res = await fetch(`/api/products/${id}`, { method: "DELETE" });
    if (res.ok) {
      setProducts((p) => p.filter((item) => item.id !== id));
    }
  }

  function handleFormSuccess() {
    setShowForm(false);
    setEditing(null);
    refreshProducts();
  }

  return (
    <div>
      <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-sm text-slate-500">
            Manage products and categories ({products.length} items)
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => {
              setEditing(null);
              setShowForm(true);
            }}
          >
            <Plus size={18} />
            Add Product
          </Button>
          <Button variant="ghost" onClick={() => signOut({ callbackUrl: "/" })}>
            <LogOut size={18} />
            Logout
          </Button>
        </div>
      </div>

      {(showForm || editing) && (
        <div className="mb-8">
          <AdminProductForm
            product={editing ?? undefined}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
          />
        </div>
      )}

      <div className="glass overflow-hidden rounded-2xl">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs tracking-wider text-slate-500 uppercase">
                <th className="px-4 py-3">Product</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Specs</th>
                <th className="px-4 py-3">Featured</th>
                <th className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr
                  key={product.id}
                  className="border-b border-slate-100 hover:bg-slate-50"
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-slate-50 p-0.5">
                        <Image
                          src={product.imageUrl}
                          alt={product.name}
                          fill
                          className="object-contain object-center"
                        />
                      </div>
                      <span className="font-medium">{product.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {formatCategory(product.category)}
                  </td>
                  <td className="px-4 py-3 text-slate-600">
                    {product.voltage} / {product.capacity}
                  </td>
                  <td className="px-4 py-3">
                    {product.featured ? (
                      <span className="text-cyan-600">Yes</span>
                    ) : (
                      <span className="text-slate-400">No</span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setEditing(product);
                          setShowForm(false);
                        }}
                        className="rounded-lg p-2 text-cyan-600 hover:bg-cyan-50"
                        aria-label="Edit"
                      >
                        <Pencil size={16} />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(product.id)}
                        className="rounded-lg p-2 text-red-600 hover:bg-red-50"
                        aria-label="Delete"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <p className="p-8 text-center text-slate-500">
            No products yet. Click &quot;Add Product&quot; to get started.
          </p>
        )}
      </div>
    </div>
  );
}
