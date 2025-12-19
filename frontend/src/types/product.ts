// Product type - matches your backend entity structure
export interface Product {
  id: number;           // Product ID (auto-generated)
  productName: string;  // Product Name
  price: number;        // Price
  quantity: number;     // Quantity
  description: string;  // Description
}

// Form data for Add/Edit (without id since backend generates it)
export type ProductFormData = Omit<Product, 'id'>;
