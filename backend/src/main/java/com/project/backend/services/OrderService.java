package com.project.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.OrderDTO;
import com.project.backend.exceptions.NotFoundException;
import com.project.backend.mappers.OrderMapper;
import com.project.backend.models.Order;
import com.project.backend.repositories.OrderRepository;
import com.project.backend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@Component("orderService")
@RequiredArgsConstructor
public class OrderService {

  @Autowired
  OrderRepository orderRepo;

  @Autowired
  UserRepository userRepo;

  @Autowired 
  OrderMapper orderMapper;

  public OrderDTO getOrderById(Long id) {
    return orderMapper
        .OrderToDTO(orderRepo.findById(id)
        .orElseThrow(()->new NotFoundException("order", id)));
  }

  public OrderDTO deleteOrderById(Long id) {
    OrderDTO orderDTO =  orderMapper
        .OrderToDTO(orderRepo.findById(id)
        .orElseThrow(() -> new NotFoundException("order", id))); 

    orderRepo.deleteOrderById(id);
    return orderDTO;
  }
}
