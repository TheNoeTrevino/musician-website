package com.project.backend.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

import com.project.backend.services.CustomerDetailsService;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
  @Autowired
  CustomerDetailsService detailsService;

  // here we can set up what has an urls dont need to be verified
  // TODO: remove the auth premitted
  @Bean
  public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
    return http.csrf(customizer -> customizer.disable())
        .authorizeHttpRequests(request -> request
            .requestMatchers("users/**", "login", "auth/**").permitAll() // for now, allow anyone to get
                                                                         // piece
            // information
            .anyRequest().authenticated())
        .httpBasic(Customizer.withDefaults())
        .sessionManagement(session -> session.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
        .build();
  }

  @Bean
  public AuthenticationProvider authenticationProvider() {
    DaoAuthenticationProvider provider = new DaoAuthenticationProvider();
    provider.setPasswordEncoder(new BCryptPasswordEncoder(5)); // this is 2^5
    provider.setUserDetailsService(detailsService);
    return provider;
  }
}
