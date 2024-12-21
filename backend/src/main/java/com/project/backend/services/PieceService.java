package com.project.backend.services;

import java.util.List;
import java.util.stream.Collectors;

import com.project.backend.DTOs.PieceDTO;
import com.project.backend.exceptions.NotFoundException;
import com.project.backend.mappers.PieceMapper;
import com.project.backend.repositories.PiecesRepository;

public class PieceService{

  @AutoWired
  PiecesRepository piecesRepo;

  @AutoWired
  PieceMapper piecesMapper;

  public PieceDTO getPieceById(Long pieceId) { 
    return piecesMapper
        .PieceToDTO(piecesRepo.findById(pieceId)
        .orElseThrow(() -> new NotFoundException("piece", pieceId)));
  }

  public List<PieceDTO> getAllPieces() { 
    return piecesRepo.findAll()
        .stream()
        .map(piecesMapper::PieceToDTO)
        .collect(Collectors.toList());
  }
}
