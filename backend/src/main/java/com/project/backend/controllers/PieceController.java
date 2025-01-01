package com.project.backend.controllers;

import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.project.backend.DTOs.PieceDTO;
import com.project.backend.services.PieceService;

@RestController
@RequestMapping("/pieces")
public class PieceController {
  private static final Logger logger = LoggerFactory.getLogger(PieceController.class);

  @Autowired
  PieceService pieceService;

  // TODO: add params
  @GetMapping("/")
  public ResponseEntity<List<PieceDTO>> getAllPieces(
    @RequestParam(required = false, defaultValue = "title") String orderBy,
    @RequestParam(required = false, defaultValue = "ASC") String sortOrder) {
    logger.info("Getting all pieces");
    return ResponseEntity.ok(pieceService.getAllPieces(sortOrder, orderBy));
  }

  @GetMapping("/piece/{id}")
  public ResponseEntity<PieceDTO> getPieceById(@PathVariable Long id) {
    logger.info("Fetching piece with id: {}", id);
    return ResponseEntity.ok(pieceService.getPieceById(id));
  }
}
