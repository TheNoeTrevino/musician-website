package com.project.backend.services;

import java.util.List;
import java.util.stream.Collectors;

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

  @Autowired
  PiecesRepository piecesRepo;

  @Autowired
  PieceMapper piecesMapper;

  public PieceDTO getPieceById(Long pieceId) { 
    return piecesMapper
        .PieceToDTO(piecesRepo.findById(pieceId)
        .orElseThrow(() -> new NotFoundException("piece", pieceId)));
  }

  public List<PieceDTO> getAllPieces(String orderBy, String sortOrder) { 
    Sort.Direction orderDirection = Sort.Direction.ASC;

    if (sortOrder == "DESC") {
      orderDirection = Sort.Direction.DESC;
    }

    Sort sort = Sort.by(orderDirection, orderBy);

    return piecesRepo.findAll(sort)
        .stream()
        .map(piecesMapper::PieceToDTO)
        .collect(Collectors.toList());
  }
}
