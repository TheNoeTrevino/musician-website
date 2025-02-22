package com.project.backend.services;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.UserDTO;
import com.project.backend.exceptions.NotFoundException;
import com.project.backend.mappers.UserMapper;
import com.project.backend.models.Users;
import com.project.backend.DTOs.CreateUpdateUserDTO;
import com.project.backend.DTOs.LoginDTO;
import com.project.backend.DTOs.LoginAndSignupResponseDTO;
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

  @Autowired
  JWTService jwtService;

  @Autowired
  AuthenticationManager authManager;

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

  public LoginAndSignupResponseDTO createUser(CreateUpdateUserDTO dto) {
    // TODO: check if they are already existing, if so, throw an error and make
    // them sign in instead. check username, and email
    if (dto.getAuthority() == null) {
      dto.setAuthority(new SimpleGrantedAuthority("user"));
    }
    Users user = userMapper.CreateUpateDTOToUser(dto);
    user.setPassword(pwEncoder.encode(user.getPassword()));
    userRepo.save(user);
    return new LoginAndSignupResponseDTO(null, "Account created successfully.", true);
  }

  public LoginAndSignupResponseDTO login(LoginDTO dto) {
    Authentication authentication = authManager
        .authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));

    if (authentication.isAuthenticated()) {
      return new LoginAndSignupResponseDTO(jwtService.generateToken(dto), "User logged in successfully", true);
    }
    return new LoginAndSignupResponseDTO(null, "User was not found", false);
  }
}
