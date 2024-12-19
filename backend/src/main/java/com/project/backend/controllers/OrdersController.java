package com.project.backend.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTOs.OrderDTO;
import com.project.backend.services.OrderService;

@RestController
@RequestMapping("/orders")
public class OrdersController {
  private static final Logger logger = LoggerFactory.getLogger(OrdersController.class);

  @Autowired
  OrderService orderService;

  @GetMapping("/order/{id}")
  public OrderDTO getOrderById(@PathVariable Long id) {
    logger.info("Searching for order with ID: {}", id);
    return orderService.getOrderById(id);
  }

  @DeleteMapping("/order/{id}")
  public OrderDTO deleteOrderById(@PathVariable Long id) {
    logger.info("Deleteing order with ID: {}", id);
    return orderService.deleteOrderById(id);
  }

  @GetMapping("/user/{id}")
  public List<OrderDTO> getOrdersByUser(@PathVariable Long id) {
    logger.info("Fetching orders with userID: {}", id);
    return orderService.getOrderByUserId(id);
  }
}
