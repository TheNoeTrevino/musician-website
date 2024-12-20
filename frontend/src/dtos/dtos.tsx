export interface UserDTO {
  firstName: string;
  lastName: string;
  emailAddress: string;
  role: string;
}

export interface PieceDTO {
  title: string;
  price: number;
}

export interface CreateOrderDTO {
  price: number;
  userId: number;
  piecesIds: number[];
}
