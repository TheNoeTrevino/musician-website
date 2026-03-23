package com.project.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import com.project.backend.DTOs.PieceDTO;
import com.project.backend.exceptions.NotFoundException;
import com.project.backend.mappers.PieceMapper;
import com.project.backend.repositories.PiecesRepository;

import lombok.RequiredArgsConstructor;

@Service
@Component("pieceService")
@RequiredArgsConstructor
public class PieceService {
  private static final Logger logger = LoggerFactory.getLogger(PieceService.class);

  @Autowired
  PiecesRepository piecesRepo;

  @Autowired
  PieceMapper piecesMapper;

  public PieceDTO getPieceById(Long pieceId) {
    logger.debug("Fetching piece by ID: {}", pieceId);
    return piecesMapper
        .PieceToDTO(piecesRepo.findById(pieceId)
        .orElseThrow(() -> {
          logger.warn("Piece not found with ID: {}", pieceId);
          return new NotFoundException("piece", pieceId);
        }));
  }

  public List<PieceDTO> getAllPieces(String sortOrder, String orderBy) {
    logger.debug("Fetching all pieces, sorted by {} {}", orderBy, sortOrder);
    Sort.Direction orderDirection = Sort.Direction.ASC;

    if (sortOrder.equals("DESC")) {
      orderDirection = Sort.Direction.DESC;
    }

    List<PieceDTO> pieces = piecesRepo.findAll(Sort.by(orderDirection, orderBy))
        .stream()
        .map(piecesMapper::PieceToDTO)
        .collect(Collectors.toList());
    logger.info("Retrieved {} pieces", pieces.size());
    return pieces;
  }
}
