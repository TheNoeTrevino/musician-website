package com.project.backend.services;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

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

  @Value("${JWT_SECRET}")
  private String jwtSecret;

  // source:
  // https://github.com/navinreddy20/spring6yt/blob/main/Part38-Spring%20Security%206%20Validating%20JWT%20Token/src/main/java/com/telusko/part29springsecex/service/JWTService.java
  private SecretKey getKey() {
    byte[] keyBytes = Decoders.BASE64.decode(jwtSecret);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  public String generateToken(LoginDTO loginDTO) {

    Map<String, Object> claims = new HashMap<>();
    claims.put("hello", "world");

    return Jwts.builder()
        .claims()
        .add(claims)
        .subject(loginDTO.getUsername())
        .issuedAt(new Date(System.currentTimeMillis()))
        .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 10))
        .and()
        .signWith(getKey())
        .compact();
  }

  public String extractUsername(String token) {
    return extractClaim(token, Claims::getSubject);
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
    final String userName = extractUsername(token);
    return (userName.equals(userDetails.getUsername()) && !isTokenExpired(token));
  }

  private Date extractExpiration(String token) {
    return extractClaim(token, Claims::getExpiration);
  }

  private boolean isTokenExpired(String token) {
    return extractExpiration(token).before(new Date());
  }
}
