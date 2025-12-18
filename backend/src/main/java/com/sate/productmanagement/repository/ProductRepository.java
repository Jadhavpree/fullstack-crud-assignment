package com.sate.productmanagement.repository;

import com.sate.productmanagement.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {
    // JpaRepository provides: findAll(), findById(), save(), deleteById()
    // No need to write any code - Spring Data JPA handles it!
}