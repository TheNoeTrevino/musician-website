package com.project.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mappings;
import org.mapstruct.Mapping;

import com.project.backend.DTOs.UserDTO;
import com.project.backend.models.Users;

@Mapper(componentModel = "spring")
public interface UserMapper {
  @Mappings({
      @Mapping(source = "id", target = "userId")
  })
  public UserDTO UserToDTO(Users User);

}
