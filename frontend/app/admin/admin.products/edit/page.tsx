'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

export default function EditProduct() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    const res = await fetch(`${API_URL}/products/${id}`);
    const product = await res.json();

    setName(product.name);
    setPrice(product.price.toString());
    setQuantity(product.quantity.toString());
    setImageUrl(product.imageUrl);
  };

  const handleUpdate = async () => {
    await fetch(`${API_URL}/products/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      body: JSON.stringify({
        name,
        price: Number(price),
        quantity: Number(quantity),
        imageUrl, // backend will handle upload OR keep existing
      }),
    });

    router.push('/admin/admin.products');
  };

  return (
    <div className="max-w-xl">
      <h1 className="text-3xl font-bold mb-5">Edit Product</h1>

      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="border w-full p-2 mb-3"
      />

      <input
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        type="number"
        placeholder="Price"
        className="border w-full p-2 mb-3"
      />

      <input
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        type="number"
        placeholder="Quantity"
        className="border w-full p-2 mb-3"
      />

      {imageUrl && (
        <img src={imageUrl} alt="product" width={150} className="mb-3" />
      )}

      <button onClick={handleUpdate} className="border px-4 py-2">
        Update Product
      </button>
    </div>
  );
}