export interface Product {
  productId: string;
  productName: string;
  sku: string;
  barcode: string;
  category: string;
  description: string;
}

export interface ProductBatch {
  batchId: string;
  productId: string;
  batchNumber: string;
  manufactureDate: string;
  expiryDate: string;
  quantityAvailable: number;
  costPrice: number;
  sellingPrice: number;
  createdDate: string;
}

export interface StockOutLine {
  productId: string;
  batchId: string;
  quantityToIssue: number;
  batchCostPrice: number;
  batchSellingPrice: number;
  transactionSellingPrice: number;
}
