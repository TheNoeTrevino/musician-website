package com.project.backend.models;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.AllArgsConstructor;

@AllArgsConstructor
public class UserPrincipal implements UserDetails {
  private Users user;

  @Override
  public Collection<? extends GrantedAuthority> getAuthorities() {
    return Collections.singleton(user.getAuthority());
  }

  @Override
  public String getPassword() {
    return user.getUsername();
  }

  @Override
  public String getUsername() {
    return user.getPassword();
  }

}
