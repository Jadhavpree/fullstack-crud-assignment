/**
 * useProducts HOOK
 * =================
 * Custom React hook for managing product state.
 * Uses the productService to interact with API.
 */

import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '@/types/product';
import * as productService from '@/services/productService';
import { toast } from '@/hooks/use-toast';

export const useProducts = () => {
  // State: list of products
  const [products, setProducts] = useState<Product[]>([]);
  
  // State: loading indicator
  const [loading, setLoading] = useState(true);

  // Fetch all products on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // GET - Fetch all products
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const data = await productService.getAllProducts();
      setProducts(data);
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to fetch products', variant: 'destructive' });
    } finally {
      setLoading(false);
    }
  };

  // POST - Add new product
  const addProduct = async (data: ProductFormData) => {
    try {
      const newProduct = await productService.addProduct(data);
      setProducts(prev => [...prev, newProduct]);
      toast({ title: 'Success', description: 'Product added!' });
      return newProduct;
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to add product', variant: 'destructive' });
      throw error;
    }
  };

  // PUT - Update existing product
  const updateProduct = async (id: number, data: ProductFormData) => {
    try {
      const updated = await productService.updateProduct(id, data);
      setProducts(prev => prev.map(p => (p.id === id ? updated : p)));
      toast({ title: 'Success', description: 'Product updated!' });
      return updated;
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to update product', variant: 'destructive' });
      throw error;
    }
  };

  // DELETE - Remove product
  const deleteProduct = async (id: number) => {
    try {
      await productService.deleteProduct(id);
      setProducts(prev => prev.filter(p => p.id !== id));
      toast({ title: 'Success', description: 'Product deleted!' });
    } catch (error) {
      toast({ title: 'Error', description: 'Failed to delete product', variant: 'destructive' });
      throw error;
    }
  };

  return {
    products,
    loading,
    fetchProducts,
    addProduct,
    updateProduct,
    deleteProduct,
  };
};
