package com.project.backend.mappers;

import com.project.backend.DTOs.OrderDTO;
import com.project.backend.models.Order;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;

@Mapper(componentModel = "spring", uses = PieceMapper.class)
public interface OrderMapper {
  @Mappings({
    @Mapping(source = "id", target = "orderId"),
  })
  public OrderDTO OrderToDTO(Order order);
}
