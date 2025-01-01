package com.project.backend.mappers;

import org.mapstruct.Mapper;

import com.project.backend.DTOs.PieceDTO;
import com.project.backend.models.Piece;

@Mapper(componentModel = "spring")
public interface PieceMapper {
  public PieceDTO PieceToDTO(Piece order);
}
