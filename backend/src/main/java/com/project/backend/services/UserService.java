package com.project.backend.services;

import org.springframework.beans.factory.annotation.Autowired;

import com.project.backend.DTOs.UserDTO;
import com.project.backend.exceptions.NotFoundException;
import com.project.backend.mappers.UserMapper;
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

}
