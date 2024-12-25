package com.project.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.UserDTO;
import com.project.backend.eums.Role;
import com.project.backend.exceptions.NotFoundException;
import com.project.backend.mappers.UserMapper;
import com.project.backend.models.Users;
import com.project.backend.DTOs.CreateUpdateUserDTO;
import com.project.backend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;


@Service
@Component("userService")
@RequiredArgsConstructor
public class UserService {

  @Autowired
  UserRepository userRepo;

  @Autowired
  UserMapper userMapper;

  public UserDTO getUserById(Long userId) {
    return userMapper
        .UserToDTO(userRepo.findById(userId)
        .orElseThrow(() -> new NotFoundException("user", userId)));
  };

  public UserDTO deleteUserById(Long userId) {
    UserDTO userDTO = userMapper
        .UserToDTO(userRepo.findById(userId)
        .orElseThrow(() -> new NotFoundException("user", userId)));

    userRepo.deleteUserById(userId);

    return userDTO;
  };

  public List<UserDTO> getUsersByRole(Role role) {
    List<Users> users = userRepo.findByRole(role);

    List<UserDTO> usersDTO = users
        .stream()
        .map(userMapper::UserToDTO)
        .collect(Collectors.toList());

    return usersDTO;
  }

  public UserDTO createUser(CreateUpdateUserDTO dto) {
    Users user = userRepo.save(userMapper.CreateUpateDTOToUser(dto));
    return userMapper.UserToDTO(user);
  }
}
