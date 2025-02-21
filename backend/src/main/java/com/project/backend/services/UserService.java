package com.project.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.UserDTO;
import com.project.backend.exceptions.NotFoundException;
import com.project.backend.mappers.UserMapper;
import com.project.backend.models.Users;
import com.project.backend.DTOs.CreateUpdateUserDTO;
import com.project.backend.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

// TODO: make this extend the user details service
// https://github.com/navinreddy20/spring6yt/blob/main/Part36-Spring%20Security%206%20Project%20Setup%20for%20JWT/src/main/java/com/telusko/part29springsecex/service/MyUserDetailsService.java
// something is getting difficult
@Service
@Component("userService")
@RequiredArgsConstructor
public class UserService {

  @Autowired
  UserRepository userRepo;

  @Autowired
  UserMapper userMapper;

  private BCryptPasswordEncoder pwEncoder = new BCryptPasswordEncoder(10);

  public List<UserDTO> getAllUsers(String sortOrder, String orderBy) {
    Sort.Direction orderDirection = Sort.Direction.ASC;

    if (sortOrder.equals("DESC")) {
      orderDirection = Sort.Direction.DESC;
    }

    return userRepo
        .findAll(Sort.by(orderDirection, orderBy))
        .stream()
        .map(userMapper::UserToDTO)
        .collect(Collectors.toList());
  }

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

  public UserDTO createUser(CreateUpdateUserDTO dto) {
    Users user = userMapper.CreateUpateDTOToUser(dto);
    user.setPassword(pwEncoder.encode(user.getPassword()));
    return userMapper.UserToDTO(userRepo.save(user));
  }
}
