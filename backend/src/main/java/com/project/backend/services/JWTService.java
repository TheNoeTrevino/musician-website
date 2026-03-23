package com.project.backend.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.LoginDTO;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;

@Service
@Component("jwtService")
@RequiredArgsConstructor
public class JWTService {
  private static final Logger logger = LoggerFactory.getLogger(JWTService.class);

  @Value("${JWT_SECRET}")
  private String jwtSecret;

  // source:
  // https://github.com/navinreddy20/spring6yt/blob/main/Part38-Spring%20Security%206%20Validating%20JWT%20Token/src/main/java/com/telusko/part29springsecex/service/JWTService.java
  private SecretKey getKey() {
    byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String generateToken(LoginDTO loginDTO) {
    logger.debug("Generating JWT token for user: {}", loginDTO.getUsername());
    Map<String, Object> claims = new HashMap<>();
    claims.put("hello", "world");

    String token = Jwts.builder()
        .claims()
        .add(claims)
        .subject(loginDTO.getUsername())
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 10))
        .and()
        .signWith(getKey())
        .compact();
    logger.debug("JWT token generated successfully for user: {}", loginDTO.getUsername());
    return token;
  }

  public String extractUsername(String token) {
    try {
      String username = extractClaim(token, Claims::getSubject);
      logger.debug("Extracted username from token: {}", username);
      return username;
    } catch (Exception ex) {
      logger.warn("Failed to extract username from token: {}", ex.getMessage());
      throw ex;
    }
  }

  private <T> T extractClaim(String token, Function<Claims, T> claimResolver) {
    final Claims claims = extractAllClaims(token);
    return claimResolver.apply(claims);
  }

  private Claims extractAllClaims(String token) {
    return Jwts.parser()
        .verifyWith(getKey())
        .build()
        .parseSignedClaims(token)
        .getPayload();
  }

  public boolean validateToken(String token, UserDetails userDetails) {
    try {
      final String userName = extractUsername(token);
      boolean isValid = userName.equals(userDetails.getUsername()) && !isTokenExpired(token);
      if (isValid) {
        logger.debug("JWT token validated successfully for user: {}", userName);
      } else {
        if (!userName.equals(userDetails.getUsername())) {
          logger.warn("JWT token username mismatch: token has {} but expected {}", userName, userDetails.getUsername());
        } else {
          logger.warn("JWT token expired for user: {}", userName);
        }
      }
      return isValid;
    } catch (Exception ex) {
      logger.error("JWT token validation failed: {}", ex.getMessage());
      return false;
    }
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }
}
