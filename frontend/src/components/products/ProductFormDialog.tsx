/**
 * PRODUCT FORM DIALOG
 * ====================
 * Modal form for Adding and Editing products.
 * Uses React Hook Form for form handling and Zod for validation.
 */

import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Product, ProductFormData } from '@/types/product';
import {
  Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle,
} from '@/components/ui/dialog';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

// Form validation schema using Zod
const formSchema = z.object({
  productName: z.string().min(2, 'Name must be at least 2 characters'),
  price: z.coerce.number().positive('Price must be positive'),
  quantity: z.coerce.number().int().nonnegative('Quantity must be 0 or more'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
});

interface ProductFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  product?: Product | null;  // If provided, we're editing
  onSubmit: (data: ProductFormData) => Promise<void>;
}

const ProductFormDialog = ({ open, onOpenChange, product, onSubmit }: ProductFormDialogProps) => {
  const isEditing = !!product;

  // Initialize form with react-hook-form
  const form = useForm<ProductFormData>({
    resolver: zodResolver(formSchema),
    defaultValues: { productName: '', price: 0, quantity: 0, description: '' },
  });

  // Reset form when dialog opens/closes or product changes
  useEffect(() => {
    if (product) {
      form.reset({
        productName: product.productName,
        price: product.price,
        quantity: product.quantity,
        description: product.description,
      });
    } else {
      form.reset({ productName: '', price: 0, quantity: 0, description: '' });
    }
  }, [product, form]);

  // Handle form submission
  const handleSubmit = async (data: ProductFormData) => {
    await onSubmit(data);
    onOpenChange(false);
    form.reset();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>{isEditing ? 'Edit Product' : 'Add New Product'}</DialogTitle>
          <DialogDescription>
            {isEditing ? 'Update the product details.' : 'Fill in the details to add a new product.'}
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
            {/* Product Name Field */}
            <FormField control={form.control} name="productName" render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter product name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Price and Quantity Row */}
            <div className="grid grid-cols-2 gap-4">
              <FormField control={form.control} name="price" render={({ field }) => (
                <FormItem>
                  <FormLabel>Price ($)</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" placeholder="0.00" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />

              <FormField control={form.control} name="quantity" render={({ field }) => (
                <FormItem>
                  <FormLabel>Quantity</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="0" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} />
            </div>

            {/* Description Field */}
            <FormField control={form.control} name="description" render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Enter product description" className="min-h-[80px]" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Form Buttons */}
            <DialogFooter className="pt-4">
              <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Saving...' : isEditing ? 'Update' : 'Add Product'}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ProductFormDialog;
