package com.project.backend.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.project.backend.models.UserPrincipal;
import com.project.backend.models.Users;
import com.project.backend.repositories.UserRepository;

@Service
public class CustomerDetailsService implements UserDetailsService {
  @Autowired
  UserRepository userRepo;

  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    Users user = userRepo.findByUsername(username)
        .orElseThrow(() -> new UsernameNotFoundException("Username not found"));

    return new UserPrincipal(user);
  }
}
