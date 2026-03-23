package com.project.backend.services;

import java.util.Collections;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.backend.exceptions.UserNotFoundException;
import com.project.backend.models.Users;
import com.project.backend.repositories.UserRepository;

@Service
public class CustomerDetailsService implements UserDetailsService {
  private static final Logger logger = LoggerFactory.getLogger(CustomerDetailsService.class);

  @Autowired
  UserRepository userRepo;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    logger.debug("Loading user details for username: {}", username);
    try {
      Users user = userRepo.findByUsername(username).orElseThrow(() -> {
        logger.warn("User not found: {}", username);
        return new UserNotFoundException("user", username);
      });
      logger.debug("User details loaded successfully for: {}", username);
      return new User(user.getUsername(), user.getPassword(), Collections.singleton(user.getAuthority()));
    } catch (Exception ex) {
      logger.error("Error loading user details for {}: {}", username, ex.getMessage());
      throw ex;
    }
  }
}
