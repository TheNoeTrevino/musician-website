package com.project.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

import com.project.backend.DTOs.OrderDTO;
import com.project.backend.models.Order;

@Mapper(componentModel = "spring")
public interface OrderMapper {
  @Mappings({
      @Mapping(source = "id", target = "orderId"),
  })
  public OrderDTO OrderToDTO(Order order);
}
