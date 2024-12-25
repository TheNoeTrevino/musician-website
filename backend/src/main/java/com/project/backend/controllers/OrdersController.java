package com.project.backend.controllers;

import com.project.backend.DTOs.CreateUpdateOrderDTO;
import com.project.backend.DTOs.OrderDTO;
import com.project.backend.services.OrderService;
import jakarta.validation.Valid;
import java.util.List;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/orders")
public class OrdersController {
  private static final Logger logger = LoggerFactory.getLogger(OrdersController.class);

  @Autowired OrderService orderService;

  @GetMapping("/order/{id}")
  public ResponseEntity<OrderDTO> getOrderById(@PathVariable Long id) {
    logger.info("Searching for order with ID: {}", id);
    return ResponseEntity.ok(orderService.getOrderById(id));
  }

  @DeleteMapping("/order/{id}")
  public ResponseEntity<OrderDTO> deleteOrderById(@PathVariable Long id) {
    logger.info("Deleteing order with ID: {}", id);
    return ResponseEntity.ok(orderService.deleteOrderById(id));
  }

  @GetMapping("/order/user/{id}")
  public ResponseEntity<List<OrderDTO>> getOrdersByUserId(@PathVariable Long id) {
    logger.info("Fainetching orders with userID: {}", id);
    return ResponseEntity.ok(orderService.getOrderByUserId(id));
  }

  @PostMapping("/")
  public ResponseEntity<OrderDTO> createOrder(
      @Valid @RequestBody CreateUpdateOrderDTO newOrderDTO) {
    logger.info("Creating new order with body: {}", newOrderDTO);
    return ResponseEntity.ok(orderService.createOrder(newOrderDTO));
  }
}
