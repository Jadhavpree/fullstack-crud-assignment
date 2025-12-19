/**
 * MAIN PAGE - PRODUCT MANAGEMENT
 * ===============================
 * This is the main page that displays:
 * - Statistics cards
 * - Product list table
 * - Add/Edit/View/Delete functionality
 */

import { useState, useMemo } from 'react';
import { Plus, Package, DollarSign, BarChart3, AlertTriangle, RefreshCw, Search } from 'lucide-react';
import { Product, ProductFormData } from '@/types/product';
import { useProducts } from '@/hooks/useProducts';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import StatCard from '@/components/dashboard/StatCard';
import ProductTable from '@/components/products/ProductTable';
import ProductFormDialog from '@/components/products/ProductFormDialog';
import ProductViewDialog from '@/components/products/ProductViewDialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Index = () => {
  // Get products data and functions from custom hook
  const { products, loading, fetchProducts, addProduct, updateProduct, deleteProduct } = useProducts();
  
  // Modal states
  const [formDialogOpen, setFormDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  
  // Search state
  const [searchQuery, setSearchQuery] = useState('');

  // Calculate statistics from products
  const stats = useMemo(() => ({
    totalProducts: products.length,
    totalValue: products.reduce((sum, p) => sum + p.price * p.quantity, 0),
    totalQuantity: products.reduce((sum, p) => sum + p.quantity, 0),
    lowStockCount: products.filter(p => p.quantity < 50 && p.quantity > 0).length,
  }), [products]);

  // Filter products by search query
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return products;
    const query = searchQuery.toLowerCase();
    return products.filter(p =>
      p.productName.toLowerCase().includes(query) ||
      p.description.toLowerCase().includes(query)
    );
  }, [products, searchQuery]);

  // Handle Add button click
  const handleAddClick = () => {
    setSelectedProduct(null);
    setFormDialogOpen(true);
  };

  // Handle Edit button click
  const handleEditClick = (product: Product) => {
    setSelectedProduct(product);
    setFormDialogOpen(true);
  };

  // Handle View button click
  const handleViewClick = (product: Product) => {
    setSelectedProduct(product);
    setViewDialogOpen(true);
  };

  // Handle form submission (Add or Update)
  const handleFormSubmit = async (data: ProductFormData) => {
    if (selectedProduct) {
      await updateProduct(selectedProduct.id, data);
    } else {
      await addProduct(data);
    }
  };

  // Format currency
  const formatCurrency = (value: number) => 
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(value);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />

      <main className="flex-1 container py-8">
        {/* Hero Section */}
        <div className="mb-8 rounded-2xl gradient-hero border border-primary/20 p-8">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-3xl font-bold">Product Management</h2>
              <p className="mt-2 text-muted-foreground">
                Complete CRUD operations for managing your product inventory
              </p>
            </div>
            <Button onClick={handleAddClick} size="lg" className="gap-2 shadow-glow">
              <Plus className="h-5 w-5" />
              Add Product
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard title="Total Products" value={stats.totalProducts} icon={Package} />
          <StatCard title="Inventory Value" value={formatCurrency(stats.totalValue)} icon={DollarSign} />
          <StatCard title="Total Stock" value={stats.totalQuantity.toLocaleString()} icon={BarChart3} />
          <StatCard title="Low Stock Items" value={stats.lowStockCount} icon={AlertTriangle} />
        </div>

        {/* Products Table Section */}
        <div className="rounded-xl border border-border bg-card p-6 shadow-sm">
          {/* Table Header with Search */}
          <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-xl font-semibold">Products List</h3>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 sm:w-64"
                />
              </div>
              <Button variant="outline" size="icon" onClick={fetchProducts} title="Refresh">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Products Table */}
          <ProductTable
            products={filteredProducts}
            loading={loading}
            onView={handleViewClick}
            onEdit={handleEditClick}
            onDelete={deleteProduct}
          />
        </div>

        {/* API Reference Section */}
        <div className="mt-8 rounded-xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold mb-4">API Endpoints Reference</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="py-3 px-4 text-left font-semibold">Operation</th>
                  <th className="py-3 px-4 text-left font-semibold">Method</th>
                  <th className="py-3 px-4 text-left font-semibold">Endpoint</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Get all items</td>
                  <td className="py-3 px-4"><span className="rounded bg-success/10 px-2 py-1 text-xs font-medium text-success">GET</span></td>
                  <td className="py-3 px-4 font-mono text-xs">/api/items</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Get item by ID</td>
                  <td className="py-3 px-4"><span className="rounded bg-success/10 px-2 py-1 text-xs font-medium text-success">GET</span></td>
                  <td className="py-3 px-4 font-mono text-xs">/api/items/{'{id}'}</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Add new item</td>
                  <td className="py-3 px-4"><span className="rounded bg-info/10 px-2 py-1 text-xs font-medium text-info">POST</span></td>
                  <td className="py-3 px-4 font-mono text-xs">/api/items</td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-4">Update item</td>
                  <td className="py-3 px-4"><span className="rounded bg-warning/10 px-2 py-1 text-xs font-medium text-warning">PUT</span></td>
                  <td className="py-3 px-4 font-mono text-xs">/api/items/{'{id}'}</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">Delete item</td>
                  <td className="py-3 px-4"><span className="rounded bg-destructive/10 px-2 py-1 text-xs font-medium text-destructive">DELETE</span></td>
                  <td className="py-3 px-4 font-mono text-xs">/api/items/{'{id}'}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />

      {/* Dialogs */}
      <ProductFormDialog
        open={formDialogOpen}
        onOpenChange={setFormDialogOpen}
        product={selectedProduct}
        onSubmit={handleFormSubmit}
      />
      <ProductViewDialog
        open={viewDialogOpen}
        onOpenChange={setViewDialogOpen}
        product={selectedProduct}
      />
    </div>
  );
};

export default Index;
