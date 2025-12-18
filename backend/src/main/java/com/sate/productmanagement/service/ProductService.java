
package com.sate.productmanagement.service;

import com.sate.productmanagement.entity.Product;
import com.sate.productmanagement.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    private ProductRepository productRepository;

    // GET all products
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    // GET product by ID
    public Product getProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Product not found with id: " + id));
    }

    // POST - Create new product
    public Product createProduct(Product product) {
        return productRepository.save(product);
    }

    // PUT - Update existing product
    public Product updateProduct(Long id, Product productDetails) {
        Product product = getProductById(id);
        
        product.setProductName(productDetails.getProductName());
        product.setPrice(productDetails.getPrice());
        product.setQuantity(productDetails.getQuantity());
        product.setDescription(productDetails.getDescription());
        
        return productRepository.save(product);
    }

    // DELETE - Remove product
    public void deleteProduct(Long id) {
        Product product = getProductById(id);
        productRepository.delete(product);
    }
}