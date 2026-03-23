package com.project.backend.filters;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import com.project.backend.services.CustomerDetailsService;
import com.project.backend.services.JWTService;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

@Component("jwtFilter")
public class JwtFilter extends OncePerRequestFilter {
  private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);

  @Autowired
  JWTService jwtService;

  @Autowired
  ApplicationContext context;

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    String authHeader = request.getHeader("Authorization");
    String token = null;
    String username = null;

    if (authHeader != null && authHeader.startsWith("Bearer")) {
      token = authHeader.substring(7);
      logger.debug("JWT token extracted from Authorization header");
      username = jwtService.extractUsername(token);
      logger.debug("Extracted username from token: {}", username);
    } else {
      logger.debug("No Bearer token in Authorization header");
    }

    if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {
      try {
        UserDetails userDetails = context.getBean(CustomerDetailsService.class).loadUserByUsername(username);

        if (jwtService.validateToken(token, userDetails)) {
          UsernamePasswordAuthenticationToken authToken = new UsernamePasswordAuthenticationToken(userDetails, null,
              userDetails.getAuthorities());
          authToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
          SecurityContextHolder.getContext().setAuthentication(authToken);
          logger.info("JWT authentication successful for user: {}", username);
        } else {
          logger.warn("JWT token validation failed for user: {}", username);
        }
      } catch (Exception ex) {
        logger.error("Error during JWT authentication for user {}: {}", username, ex.getMessage());
      }
    }
    filterChain.doFilter(request, response);
  }
}
