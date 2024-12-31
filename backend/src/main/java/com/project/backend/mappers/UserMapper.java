package com.project.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mappings;
import org.mapstruct.Mapping;

import com.project.backend.DTOs.CreateUpdateUserDTO;
import com.project.backend.DTOs.UserDTO;
import com.project.backend.DTOs.UserWithOrdersDTO;
import com.project.backend.models.Users;

@Mapper(componentModel = "spring")
public interface UserMapper {
  @Mappings({
      @Mapping(source = "id", target = "userId")
  })
  public UserDTO UserToDTO(Users user);

  @Mappings({
      @Mapping(target =  "id", ignore = true),
      @Mapping(target =  "orders", ignore = true),
      @Mapping(target =  "createdAt", ignore = true)
  })
  public Users CreateUpateDTOToUser(CreateUpdateUserDTO dto);

  @Mappings({
      @Mapping(source = "id", target = "userId"),
      @Mapping(target = "orders", ignore = true)
  })
  public UserWithOrdersDTO UserToDTOWithOrders(Users user);
}
