# 🚀 Spring Boot Backend Guide
## SAT-E Solutions - Product Management API

This guide walks you through building the Spring Boot backend step-by-step.

---

## 📋 Prerequisites

1. **Java JDK 8+** installed
2. **IDE**: IntelliJ IDEA or VS Code
3. **MySQL** installed (or use H2 for testing)
4. **Maven** (usually comes with IDE)

---

## 🏗️ Step 1: Create Spring Boot Project

### Using Spring Initializr (Recommended)
1. Go to: https://start.spring.io/
2. Fill in:
   - **Project**: Maven
   - **Language**: Java
   - **Spring Boot**: 3.x (latest)
   - **Group**: com.sate
   - **Artifact**: productmanagement
   - **Packaging**: Jar
   - **Java**: 17 (or 8 if required)

3. Add Dependencies:
   - ✅ Spring Web
   - ✅ Spring Data JPA
   - ✅ MySQL Driver (or H2 Database)
   - ✅ Lombok (optional, reduces boilerplate)

4. Click **Generate** → Download ZIP → Extract

---

## 📁 Step 2: Project Structure

```
src/main/java/com/sate/productmanagement/
├── ProductManagementApplication.java  (Main class)
├── entity/
│   └── Product.java                   (Entity/Model)
├── repository/
│   └── ProductRepository.java         (Database operations)
├── service/
│   └── ProductService.java            (Business logic)
├── controller/
│   └── ProductController.java         (REST API endpoints)
└── exception/
    └── ResourceNotFoundException.java (Error handling)
```

---

## 📝 Step 3: Create Entity Class

**File: `src/main/java/com/sate/productmanagement/entity/Product.java`**

```java
package com.sate.productmanagement.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "products")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "product_name", nullable = false)
    private String productName;

    @Column(nullable = false)
    private Double price;

    @Column(nullable = false)
    private Integer quantity;

    @Column(length = 500)
    private String description;

    // Default constructor (required by JPA)
    public Product() {}

    // Constructor with fields
    public Product(String productName, Double price, Integer quantity, String description) {
        this.productName = productName;
        this.price = price;
        this.quantity = quantity;
        this.description = description;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getProductName() { return productName; }
    public void setProductName(String productName) { this.productName = productName; }

    public Double getPrice() { return price; }
    public void setPrice(Double price) { this.price = price; }

    public Integer getQuantity() { return quantity; }
    public void setQuantity(Integer quantity) { this.quantity = quantity; }

    public String getDescription() { return description; }
    public void setDescription(String description) { this.description = description; }
}
```

---

## 📝 Step 4: Create Repository Interface

**File: `src/main/java/com/sate/productmanagement/repository/ProductRepository.java`**

```java
package com.sate.productmanagement.repository;

import com.sate.productmanagement.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // JpaRepository provides: findAll(), findById(), save(), deleteById()
    // No need to write any code - Spring Data JPA handles it!
}
```

---

## 📝 Step 5: Create Service Layer

**File: `src/main/java/com/sate/productmanagement/service/ProductService.java`**

```java
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
```

---

## 📝 Step 6: Create REST Controller

**File: `src/main/java/com/sate/productmanagement/controller/ProductController.java`**

```java
package com.sate.productmanagement.controller;

import com.sate.productmanagement.entity.Product;
import com.sate.productmanagement.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/items")
@CrossOrigin(origins = "*")  // Allows React frontend to connect
public class ProductController {

    @Autowired
    private ProductService productService;

    // GET /api/items - Get all products
    @GetMapping
    public List<Product> getAllProducts() {
        return productService.getAllProducts();
    }

    // GET /api/items/{id} - Get product by ID
    @GetMapping("/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product product = productService.getProductById(id);
        return ResponseEntity.ok(product);
    }

    // POST /api/items - Create new product
    @PostMapping
    public Product createProduct(@RequestBody Product product) {
        return productService.createProduct(product);
    }

    // PUT /api/items/{id} - Update product
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(
            @PathVariable Long id,
            @RequestBody Product productDetails) {
        Product updatedProduct = productService.updateProduct(id, productDetails);
        return ResponseEntity.ok(updatedProduct);
    }

    // DELETE /api/items/{id} - Delete product
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
```

---

## 📝 Step 7: Configure Database

**File: `src/main/resources/application.properties`**

### Option A: MySQL Database
```properties
# Server Port
server.port=8080

# MySQL Configuration
spring.datasource.url=jdbc:mysql://localhost:3306/productdb
spring.datasource.username=root
spring.datasource.password=your_password

# JPA/Hibernate
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# Create database if not exists
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
```

### Option B: H2 In-Memory Database (Easier for testing)
```properties
# Server Port
server.port=8080

# H2 Database (In-Memory)
spring.datasource.url=jdbc:h2:mem:productdb
spring.datasource.username=sa
spring.datasource.password=

# H2 Console (access at http://localhost:8080/h2-console)
spring.h2.console.enabled=true

# JPA
spring.jpa.hibernate.ddl-auto=create-drop
spring.jpa.show-sql=true
```

---

## 🚀 Step 8: Run the Application

1. Open terminal in project folder
2. Run: `mvn spring-boot:run`
3. API available at: `http://localhost:8080/api/items`

---

## 🧪 Step 9: Test with Postman

| Method | URL | Body |
|--------|-----|------|
| GET | `http://localhost:8080/api/items` | - |
| GET | `http://localhost:8080/api/items/1` | - |
| POST | `http://localhost:8080/api/items` | `{"productName":"Laptop","price":999.99,"quantity":10,"description":"Gaming laptop"}` |
| PUT | `http://localhost:8080/api/items/1` | `{"productName":"Updated Laptop","price":1099.99,"quantity":15,"description":"Updated desc"}` |
| DELETE | `http://localhost:8080/api/items/1` | - |

---

## 🔗 Step 10: Connect React Frontend

In `src/services/productService.ts`, uncomment the real API calls and comment out the mock ones.

```typescript
const API_BASE_URL = 'http://localhost:8080/api/items';

export const getAllProducts = async (): Promise<Product[]> => {
  const response = await fetch(API_BASE_URL);
  return response.json();
};
```

---

## 📊 Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     FRONTEND (React)                        │
│  ┌─────────┐  ┌──────────┐  ┌────────────┐                 │
│  │   UI    │──│  Hooks   │──│  Services  │                 │
│  │Components│  │useProducts│  │productService│              │
│  └─────────┘  └──────────┘  └────────────┘                 │
└────────────────────────┬────────────────────────────────────┘
                         │ HTTP Requests (Fetch/Axios)
                         ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Spring Boot)                     │
│  ┌────────────┐  ┌─────────┐  ┌────────────┐  ┌──────────┐ │
│  │ Controller │──│ Service │──│ Repository │──│ Database │ │
│  │ (REST API) │  │ (Logic) │  │   (JPA)    │  │ (MySQL)  │ │
│  └────────────┘  └─────────┘  └────────────┘  └──────────┘ │
└─────────────────────────────────────────────────────────────┘
```

---

## ✅ Checklist for Submission

- [ ] Backend runs without errors
- [ ] All 5 API endpoints work (GET, GET by ID, POST, PUT, DELETE)
- [ ] Frontend connects to backend
- [ ] CRUD operations work end-to-end
- [ ] Basic error handling implemented
- [ ] Code is clean and organized

---

## 💡 Tips for Presentation

1. **Start with Architecture**: Explain the layered structure
2. **Show API First**: Demo Postman requests
3. **Then Frontend**: Show the UI interacting with API
4. **Explain Each Layer**: Entity → Repository → Service → Controller
5. **Highlight REST Principles**: Proper HTTP methods and status codes

Good luck! 🎯
