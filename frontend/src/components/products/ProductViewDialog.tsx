/**
 * PRODUCT VIEW DIALOG
 * ====================
 * Modal to display product details in a read-only format.
 */

import { Product } from '@/types/product';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Package, DollarSign, Hash, FileText } from 'lucide-react';

interface ProductViewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product: Product | null;
}

const ProductViewDialog = ({ open, onOpenChange, product }: ProductViewDialogProps) => {
  if (!product) return null;

  const formatPrice = (price: number) => `$${price.toFixed(2)}`;

  const getStockBadge = (quantity: number) => {
    if (quantity === 0) return <Badge variant="destructive">Out of Stock</Badge>;
    if (quantity < 50) return <Badge variant="secondary">Low Stock</Badge>;
    return <Badge variant="default">In Stock</Badge>;
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Package className="h-5 w-5 text-primary" />
            Product Details
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Header with ID and Status */}
          <div className="flex items-center justify-between">
            <span className="font-mono text-sm text-muted-foreground">ID: #{product.id}</span>
            {getStockBadge(product.quantity)}
          </div>

          {/* Product Name */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
              <Package className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground uppercase">Product Name</p>
              <p className="font-semibold">{product.productName}</p>
            </div>
          </div>

          {/* Price and Quantity */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-success/10">
                <DollarSign className="h-4 w-4 text-success" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Price</p>
                <p className="font-bold text-success">{formatPrice(product.price)}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-info/10">
                <Hash className="h-4 w-4 text-info" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground uppercase">Quantity</p>
                <p className="font-bold text-info">{product.quantity} units</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="flex items-start gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-warning/10">
              <FileText className="h-4 w-4 text-warning" />
            </div>
            <div className="flex-1">
              <p className="text-xs text-muted-foreground uppercase">Description</p>
              <p className="text-sm leading-relaxed">{product.description}</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProductViewDialog;
