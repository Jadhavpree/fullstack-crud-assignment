/**
 * PRODUCT TABLE COMPONENT
 * ========================
 * Displays products in a table with View, Edit, Delete actions.
 */

import { useState } from 'react';
import { Eye, Pencil, Trash2, Package } from 'lucide-react';
import { Product } from '@/types/product';
import { Button } from '@/components/ui/button';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Badge } from '@/components/ui/badge';

interface ProductTableProps {
  products: Product[];
  loading: boolean;
  onView: (product: Product) => void;
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const ProductTable = ({ products, loading, onView, onEdit, onDelete }: ProductTableProps) => {
  // State for delete confirmation dialog
  const [deleteId, setDeleteId] = useState<number | null>(null);

  // Handle delete confirmation
  const handleDeleteConfirm = () => {
    if (deleteId) {
      onDelete(deleteId);
      setDeleteId(null);
    }
  };

  // Format price as currency
  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  // Get stock status badge
  const getStockBadge = (quantity: number) => {
    if (quantity === 0) return <Badge variant="destructive">Out of Stock</Badge>;
    if (quantity < 50) return <Badge variant="secondary">Low Stock</Badge>;
    return <Badge variant="default">In Stock</Badge>;
  };

  // Loading state
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  // Empty state
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <Package className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold">No products found</h3>
        <p className="text-sm text-muted-foreground">Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <>
      {/* Products Table */}
      <div className="rounded-lg border border-border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead>ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id} className="hover:bg-muted/30">
                <TableCell className="font-mono text-muted-foreground">#{product.id}</TableCell>
                <TableCell className="font-medium">{product.productName}</TableCell>
                <TableCell className="font-semibold text-primary">{formatPrice(product.price)}</TableCell>
                <TableCell>{product.quantity}</TableCell>
                <TableCell>{getStockBadge(product.quantity)}</TableCell>
                <TableCell className="text-right">
                  {/* Action Buttons */}
                  <div className="flex items-center justify-end gap-1">
                    {/* View Button */}
                    <Button variant="ghost" size="icon" onClick={() => onView(product)}
                      className="h-8 w-8 text-info hover:bg-info/10">
                      <Eye className="h-4 w-4" />
                    </Button>
                    {/* Edit Button */}
                    <Button variant="ghost" size="icon" onClick={() => onEdit(product)}
                      className="h-8 w-8 text-warning hover:bg-warning/10">
                      <Pencil className="h-4 w-4" />
                    </Button>
                    {/* Delete Button */}
                    <Button variant="ghost" size="icon" onClick={() => setDeleteId(product.id)}
                      className="h-8 w-8 text-destructive hover:bg-destructive/10">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Product</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this product? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ProductTable;
