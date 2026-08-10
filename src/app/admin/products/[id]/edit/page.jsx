"use client";

import React from 'react';
import { useParams } from 'next/navigation';
import ProductsAddForm from '../../new/productsAddForm';

export default function ProductEditPage() {
  const params = useParams();
  const productId = params?.id;

  return <ProductsAddForm mode="edit" productId={productId} />;
}
