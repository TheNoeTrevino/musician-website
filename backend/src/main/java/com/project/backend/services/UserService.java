package com.project.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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
  private static final Logger logger = LoggerFactory.getLogger(UserService.class);

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
    logger.debug("Fetching all users, sorted by {} {}", orderBy, sortOrder);
    Sort.Direction orderDirection = Sort.Direction.ASC;

    if (sortOrder.equals("DESC")) {
      orderDirection = Sort.Direction.DESC;
    }

    List<UserDTO> users = userRepo
        .findAll(Sort.by(orderDirection, orderBy))
        .stream()
        .map(userMapper::UserToDTO)
        .collect(Collectors.toList());
    logger.info("Retrieved {} users", users.size());
    return users;
  }

  public UserDTO getUserById(Long userId) {
    logger.debug("Fetching user by ID: {}", userId);
    return userMapper
        .UserToDTO(userRepo.findById(userId)
            .orElseThrow(() -> {
              logger.warn("User not found with ID: {}", userId);
              return new NotFoundException("user", userId);
            }));
  };

  public UserDTO deleteUserById(Long userId) {
    logger.info("Deleting user with ID: {}", userId);
    UserDTO userDTO = userMapper
        .UserToDTO(userRepo.findById(userId)
            .orElseThrow(() -> {
              logger.warn("User not found for deletion, ID: {}", userId);
              return new NotFoundException("user", userId);
            }));

    userRepo.deleteUserById(userId);
    logger.info("User successfully deleted, ID: {}", userId);

    return userDTO;
  };

  public LoginAndSignupResponseDTO createUser(CreateUpdateUserDTO dto) {
    logger.info("Creating new user account for username: {}", dto.getUsername());
    // TODO: check if they are already existing, if so, throw an error and make
    // them sign in instead. check username, and email
    if (dto.getAuthority() == null) {
      dto.setAuthority(new SimpleGrantedAuthority("user"));
    }
    Users user = userMapper.CreateUpateDTOToUser(dto);
    user.setPassword(pwEncoder.encode(user.getPassword()));
    userRepo.save(user);
    logger.info("User account created successfully for username: {}", dto.getUsername());
    return new LoginAndSignupResponseDTO(null, "Account created successfully.", true);
  }

  public LoginAndSignupResponseDTO login(LoginDTO dto) {
    logger.info("Login attempt for user: {}", dto.getUsername());
    try {
      Authentication authentication = authManager
          .authenticate(new UsernamePasswordAuthenticationToken(dto.getUsername(), dto.getPassword()));

      if (authentication.isAuthenticated()) {
        logger.info("User login successful: {}", dto.getUsername());
        return new LoginAndSignupResponseDTO(jwtService.generateToken(dto), "User logged in successfully", true);
      }
      logger.warn("User login failed: authentication not authenticated for user {}", dto.getUsername());
      return new LoginAndSignupResponseDTO(null, "User was not found", false);
    } catch (Exception ex) {
      logger.warn("Login authentication failed for user {}: {}", dto.getUsername(), ex.getMessage());
      return new LoginAndSignupResponseDTO(null, "User was not found", false);
    }
  }
}
