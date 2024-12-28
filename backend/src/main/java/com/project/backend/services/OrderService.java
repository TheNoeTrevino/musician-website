package com.project.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.CreateUpdateOrderDTO;
import com.project.backend.DTOs.OrderDTO;
import com.project.backend.exceptions.NotFoundException;
import com.project.backend.mappers.OrderMapper;
import com.project.backend.models.Order;
import com.project.backend.models.Piece;
import com.project.backend.models.Users;
import com.project.backend.repositories.OrderRepository;
import com.project.backend.repositories.PiecesRepository;
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
  PiecesRepository piecesRepo;

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

  public List<OrderDTO> getOrderByUserId(Long id) {
    userRepo.findById(id)
        .orElseThrow(()->new NotFoundException("order", id));

    List<Order> orders = orderRepo.findByUserId(id);

    List<OrderDTO> orderDTOs = orders.stream()
        .map(orderMapper::OrderToDTO)
        .collect(Collectors.toList());

    return orderDTOs;
  }

  public OrderDTO createOrder(CreateUpdateOrderDTO newOrderDTO) {
    Order order = mapCreateDTOToOrder(newOrderDTO);
    OrderDTO orderDTO = orderMapper.OrderToDTO(orderRepo.save(order));

    return orderDTO;
  }

  // maybe move this to a mapper
  public Order mapCreateDTOToOrder(CreateUpdateOrderDTO newOrder) {
    Order order = new Order();

    Users user = userRepo.findById(newOrder.getUserId())
        .orElseThrow(() -> new NotFoundException("User", newOrder.getUserId()));
    order.setUser(user);

    List<Piece> pieces = newOrder.getPieceIds()
        .stream()
        .map(id -> piecesRepo.findById(id)
            .orElseThrow(() -> new NotFoundException("pieces", id)))
        .collect(Collectors.toList());

    Double totalPrice = pieces
        .stream()
        .mapToDouble(x -> x.getPrice())
        .sum();

    order.setPieces(pieces);
    order.setPrice(totalPrice);

    return order;
  }
}
