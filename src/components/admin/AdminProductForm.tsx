"use client";

import { useState } from "react";
import { Category, Product } from "@prisma/client";
import { ALL_CATEGORIES, CATEGORY_LABELS } from "@/lib/constants";
import Button from "@/components/ui/Button";
import { Upload, X } from "lucide-react";
import Image from "next/image";

type AdminProductFormProps = {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
};

const emptyForm = {
  name: "",
  description: "",
  voltage: "",
  capacity: "",
  category: "CERAMIC" as Category,
  imageUrl: "/images/product-sample.png",
  featured: false,
};

const inputClass =
  "w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-900 focus:border-cyan-500/50 focus:outline-none";

export default function AdminProductForm({
  product,
  onSuccess,
  onCancel,
}: AdminProductFormProps) {
  const [form, setForm] = useState(
    product
      ? {
          name: product.name,
          description: product.description,
          voltage: product.voltage,
          capacity: product.capacity,
          category: product.category,
          imageUrl: product.imageUrl,
          featured: product.featured,
        }
      : emptyForm
  );
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);
      setForm((f) => ({ ...f, imageUrl: data.url }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const url = product
        ? `/api/products/${product.id}`
        : "/api/admin/products";
      const method = product ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error ?? "Failed to save product");
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass space-y-4 rounded-2xl p-6"
    >
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">
          {product ? "Edit Product" : "Add New Product"}
        </h3>
        <button
          type="button"
          onClick={onCancel}
          className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
        >
          <X size={20} />
        </button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-slate-500">Product Name</label>
          <input
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className={inputClass}
          />
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-slate-500">Description</label>
          <textarea
            required
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-500">Voltage</label>
          <input
            required
            value={form.voltage}
            onChange={(e) => setForm({ ...form, voltage: e.target.value })}
            className={inputClass}
            placeholder="e.g. 50V"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-500">Capacity</label>
          <input
            required
            value={form.capacity}
            onChange={(e) => setForm({ ...form, capacity: e.target.value })}
            className={inputClass}
            placeholder="e.g. 100nF"
          />
        </div>

        <div>
          <label className="mb-1 block text-xs text-slate-500">Category</label>
          <select
            value={form.category}
            onChange={(e) =>
              setForm({ ...form, category: e.target.value as Category })
            }
            className={inputClass}
          >
            {ALL_CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {CATEGORY_LABELS[cat]}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-end">
          <label className="flex cursor-pointer items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.featured}
              onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              className="rounded border-slate-300"
            />
            Featured on homepage
          </label>
        </div>

        <div className="sm:col-span-2">
          <label className="mb-1 block text-xs text-slate-500">Product Image</label>
          <div className="flex flex-wrap items-start gap-4">
            <div className="relative aspect-square h-28 w-28 overflow-hidden rounded-lg bg-slate-50 p-1">
              <Image
                src={form.imageUrl}
                alt="Preview"
                fill
                className="object-contain object-center"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="inline-flex cursor-pointer items-center gap-2 rounded-lg border border-dashed border-cyan-300 px-4 py-2 text-sm text-cyan-700 hover:bg-cyan-50">
                <Upload size={16} />
                {uploading ? "Uploading..." : "Upload Image"}
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleUpload}
                  disabled={uploading}
                />
              </label>
              <input
                value={form.imageUrl}
                onChange={(e) => setForm({ ...form, imageUrl: e.target.value })}
                className={inputClass}
                placeholder="Or paste image URL"
              />
            </div>
          </div>
        </div>
      </div>

      {error && <p className="text-sm text-red-600">{error}</p>}

      <div className="flex gap-3">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : product ? "Update Product" : "Add Product"}
        </Button>
        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  );
}
