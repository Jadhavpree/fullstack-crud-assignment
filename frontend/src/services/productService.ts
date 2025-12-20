/**
 * PRODUCT SERVICE - Connected to Spring Boot Backend
 */

import { Product, ProductFormData } from '@/types/product';

// Your Spring Boot backend URL (change port if needed)
const API_BASE_URL = 'http://localhost:9090/api/items';

// GET /api/items - Fetch all products
export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_BASE_URL);
  if (!response.ok) throw new Error('Failed to fetch products');
  return response.json();
};

// GET /api/items/{id} - Get single product
export const getProductById = async (id: number): Promise<Product | null> => {
  const response = await fetch(`${API_BASE_URL}/${id}`);
  if (!response.ok) return null;
  return response.json();
};

// POST /api/items - Add new product
export const addProduct = async (data: ProductFormData): Promise<Product> => {
  const response = await fetch(API_BASE_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to add product');
  return response.json();
};

// PUT /api/items/{id} - Update product
export const updateProduct = async (id: number, data: ProductFormData): Promise<Product> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  if (!response.ok) throw new Error('Failed to update product');
  return response.json();
};

// DELETE /api/items/{id} - Delete product
export const deleteProduct = async (id: number): Promise<void> => {
  const response = await fetch(`${API_BASE_URL}/${id}`, { method: 'DELETE' });
  if (!response.ok) throw new Error('Failed to delete product');
};
