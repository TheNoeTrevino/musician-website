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

  public List<PieceDTO> getAllPieces(String sortOrder, String orderBy) { 
    Sort.Direction orderDirection = Sort.Direction.ASC;

    if (sortOrder.equals("DESC")) {
      orderDirection = Sort.Direction.DESC;
    }

    return piecesRepo.findAll(Sort.by(orderDirection, orderBy))
        .stream()
        .map(piecesMapper::PieceToDTO)
        .collect(Collectors.toList());
  }
}
