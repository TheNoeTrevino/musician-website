export interface UserDTO {
  firstName: string;
  lastName: string;
  emailAddress: string;
  role: string;
}

export interface CreateUpdateUserDTO {
  firstName: string;
  lastName: string;
  password: string;
  emailAddress: string;
  role: string;
}

export interface PieceDTO {
  title: string;
  composer: string;
  price: number;
  yearComposed: number;
  hasElectronics: boolean;
  numOfPlayers: number;
  difficultyGrade: number;
  timeLength: number; // this might be wrong
}

export interface CreateUpdateOrderDTO {
  price: number;
  userId: number;
  piecesIds: number[];
}

export interface OrderDTO {
  orderId: number;
  price: number;
  pieces: PieceDTO[];
}

export interface UserWithOrdersDTO {
  firstName: string;
  lastName: string;
  emailAddress: string;
  role: string;
  orders: OrderDTO[];
}
