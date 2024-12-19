package com.project.backend.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.project.backend.models.Order;

public interface OrderRepository extends JpaRepository<Order, Long>,
    JpaSpecificationExecutor<Order> {

  @Modifying
  @Query("""
    DELETE FROM Order o
    where o.id = :id
    """)
  int deleteOrderById(@Param(value = "id") Long id);
}
