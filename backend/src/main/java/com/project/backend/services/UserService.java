package com.project.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;

import com.project.backend.DTOs.UserDTO;
import com.project.backend.eums.Role;
import com.project.backend.exceptions.NotFoundException;
import com.project.backend.mappers.UserMapper;
import com.project.backend.models.Users;
import com.project.backend.repositories.UserRepository;

public class UserService {

  @Autowired
  UserRepository UserRepo;

  @Autowired
  UserMapper UserMapper;

  public UserDTO getUserById(Long userId) {
    UserRepo.findById(userId);

    UserDTO userDTO = UserMapper
        .UserToDTO(UserRepo.findById(userId).orElseThrow(() -> new NotFoundException("user", userId)));

    return userDTO;
  };

  public UserDTO deleteUserById(Long userId) {
    UserDTO userDTO = UserMapper
        .UserToDTO(UserRepo.findById(userId).orElseThrow(() -> new NotFoundException("user", userId)));

    UserRepo.deleteUserById(userId);

    return userDTO;
  };

  public List<UserDTO> getUsersByRole(Role role) {
    List<Users> users = UserRepo.findByRole(role);

    List<UserDTO> usersDTO = users.stream().map(UserMapper::UserToDTO).collect(Collectors.toList());

    return usersDTO;
  }
}
