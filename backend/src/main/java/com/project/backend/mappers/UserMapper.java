package com.project.backend.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mappings;
import org.mapstruct.Mapping;

import com.project.backend.DTOs.CreateUpdateUserDTO;
import com.project.backend.DTOs.UserDTO;
import com.project.backend.models.Users;

@Mapper(componentModel = "spring")
public interface UserMapper {
  public UserDTO UserToDTO(Users user);

  @Mappings({
      @Mapping(target = "id", ignore = true),
      @Mapping(target = "createdAt", ignore = true)
  })
  public Users CreateUpateDTOToUser(CreateUpdateUserDTO dto);
}
