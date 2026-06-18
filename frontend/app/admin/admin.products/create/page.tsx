"use client";


import { useState, useRef, DragEvent, Dispatch, SetStateAction } from "react";
import { useRouter } from "next/navigation";

function FloatingInput({
  label,
  type = "text",
  value,
  onChange,
  prefix,
}: {
  label: string;
  type?: string;
  value: string;
  onChange: (v: string) => void;
  prefix?: string;
}) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;

  return (
    <div className="relative">
      {prefix && raised && (
        <span className="absolute left-3 top-6.5px text-sm text-neutral-500 pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`
          peer w-full border border-[#E2E2DE] bg-white rounded-md pt-6 pb-2 text-sm text-[#111110]
          outline-none transition-all focus:border-[#C17D3C] focus:ring-1 focus:ring-[#C17D3C]/30
          ${prefix && raised ? "pl-6" : "pl-3"} pr-3
        `}
      />
      <label
        className={`
          absolute left-3 pointer-events-none transition-all duration-150 text-[#6B6B67]
          ${raised ? "top-2 text-[10px] font-medium tracking-wide uppercase" : "top-4 text-sm"}
          ${focused ? "text-[#C17D3C]" : ""}
        `}
      >
        {label}
      </label>
    </div>
  );
}

function FloatingTextarea({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  const [focused, setFocused] = useState(false);
  const raised = focused || value.length > 0;

  return (
    <div className="relative">
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        rows={4}
        className="peer w-full border border-[#E2E2DE] bg-white rounded-md pt-6 pb-2 pl-3 pr-3 text-sm text-[#111110] outline-none transition-all focus:border-[#C17D3C] focus:ring-1 focus:ring-[#C17D3C]/30 resize-none"
      />
      <label
        className={`
          absolute left-3 pointer-events-none transition-all duration-150 text-[#6B6B67]
          ${raised ? "top-2 text-[10px] font-medium tracking-wide uppercase" : "top-4 text-sm"}
          ${focused ? "text-[#C17D3C]" : ""}
        `}
      >
        {label}
      </label>
    </div>
  );
}

export default function CreateProduct() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>(""); // ← new error state
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = (f: File | null) => {
    setFile(f);
    setPreview(f ? URL.createObjectURL(f) : null);
    setError(""); // clear error when image is selected
  };

  const handleFieldChange = (setter: Dispatch<SetStateAction<string>>, value: string) => {
    setter(value);
    setError("");
  };

  const fileToDataUrl = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(file);
    });

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f && f.type.startsWith("image/")) handleFile(f);
  };

  
const handleSubmit = async () => {
  setError("");

  if (!name.trim()) {
    setError("Product name is required.");
    return;
  }

  if (!description.trim()) {
    setError("Description is required.");
    return;
  }

  if (!price.trim()) {
    setError("Price is required.");
    return;
  }

  const priceNum = Number(price);

  if (isNaN(priceNum) || priceNum <= 0) {
    setError("Price must be a positive number.");
    return;
  }

  if (!quantity.trim()) {
    setError("Quantity is required.");
    return;
  }

  const qtyNum = Number(quantity);

  if (isNaN(qtyNum) || qtyNum < 0) {
    setError("Quantity must be a valid number.");
    return;
  }

  if (!file) {
    setError("Product image is required.");
    return;
  }

  setLoading(true);

  try {
    const imageBase64 = file ? await fileToDataUrl(file) : undefined;

    const body = {
      name: name.trim(),
      description: description.trim(),
      price: priceNum,
      quantity: qtyNum,
      imageBase64,
    };

    const response = await fetch(`${process.env.API_URL}/products`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      router.push("/admin/admin.products");
      return;
    }

    const text = await response.text();

    console.error(
      "Failed to create product",
      response.status,
      text
      
    );

    setError(
      `Failed to create product: ${response.status} ${text}`
    );
  } catch (err) {
    console.error(err);
    setError("An unexpected error occurred.");
  } finally {
    setLoading(false);
  }
};
  

  return (
    <div className="min-h-screen bg-[#F8F8F6] p-8 font-sans">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className="text-[10px] font-semibold tracking-widest uppercase text-[#C17D3C] mb-1">
            Inventory
          </p>
          <h1 className="text-2xl font-semibold text-[#111110]">New Product</h1>
        </div>

        {/* Split layout */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_320px] gap-6">
          {/* Left — fields */}
          <div className="space-y-4">
            <FloatingInput
              label="Product name"
              value={name}
              onChange={(v) => handleFieldChange(setName, v)}
            />
            <FloatingTextarea
              label="Description"
              value={description}
              onChange={(v) => handleFieldChange(setDescription, v)}
            />

            <div className="grid grid-cols-2 gap-4">
              <FloatingInput
                label="Price/bag"
                type="number"
                value={price}
                onChange={(v) => handleFieldChange(setPrice, v)}
                prefix="Mk"
              />
              <FloatingInput
                label="Quantity"
                type="number"
                value={quantity}
                onChange={(v) => handleFieldChange(setQuantity, v)}
              />
            </div>

            {/* Error message */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">
                {error}
              </div>
            )}

            {/* Actions */}
            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={handleSubmit}
                disabled={loading}
                className="
                  flex items-center gap-2 px-5 py-2.5 rounded-md text-sm font-medium
                  bg-[#111110] text-white transition-all
                  hover:bg-[#2a2a28] disabled:opacity-40 disabled:cursor-not-allowed
                "
              >
                {loading && (
                  <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z" />
                  </svg>
                )}
                {loading ? "Saving…" : "Save product"}
              </button>
              <button
                type="button"
                onClick={() => router.back()}
                className="px-5 py-2.5 rounded-md text-sm font-medium text-[#6B6B67] hover:text-[#111110] transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>

          {/* Right — image drop zone */}
          <div className="flex flex-col gap-3">
            <div
              role="button"
              tabIndex={0}
              aria-label="Upload product image"
              onClick={() => fileInputRef.current?.click()}
              onKeyDown={(e) => e.key === "Enter" && fileInputRef.current?.click()}
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={handleDrop}
              className={`
                relative flex flex-col items-center justify-center
                border-2 border-dashed rounded-xl cursor-pointer
                transition-all h-64 overflow-hidden select-none
                ${dragging
                  ? "border-[#C17D3C] bg-[#C17D3C]/5"
                  : preview
                    ? "border-transparent"
                    : "border-[#E2E2DE] hover:border-[#C17D3C]/50 hover:bg-white"
                }
              `}
            >
              {preview ? (
                <>
                  <img
                    src={preview}
                    alt="Product preview"
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/0 hover:bg-black/30 transition-all flex items-center justify-center opacity-0 hover:opacity-100">
                    <span className="text-white text-xs font-medium bg-black/50 px-3 py-1.5 rounded-full">
                      Replace image
                    </span>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2 p-6 text-center">
                  <div className="w-10 h-10 rounded-full bg-[#E2E2DE] flex items-center justify-center">
                    <svg className="w-5 h-5 text-[#6B6B67]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <p className="text-sm text-[#6B6B67]">
                    Drop image here or <span className="text-[#C17D3C] underline underline-offset-2">browse</span>
                  </p>
                  <p className="text-[11px] text-[#6B6B67]/70">PNG, JPG, WEBP</p>
                </div>
              )}
            </div>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleFile(e.target.files?.[0] || null)}
            />

            {preview && (
              <button
                type="button"
                onClick={() => {
                  setFile(null);
                  setPreview(null);
                  setError("");
                }}
                className="text-xs text-[#6B6B67] hover:text-red-500 transition-colors text-left"
              >
                Remove image
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}