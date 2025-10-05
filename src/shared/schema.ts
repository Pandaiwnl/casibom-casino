export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  balance: number;
  createdAt: Date;
}

export interface InsertUser {
  username: string;
  email: string;
  password: string;
  balance?: number;
}

export interface Game {
  id: string;
  name: string;
  imageUrl: string;
  isHot: boolean | null;
  isNew: boolean | null;
  category: string;
}

export interface InsertGame {
  name: string;
  imageUrl: string;
  isHot?: boolean | null;
  isNew?: boolean | null;
  category: string;
}

export interface Winner {
  id: string;
  playerInitials: string;
  gameName: string;
  gameImageUrl: string;
  amount: number;
  createdAt: Date;
}

export interface InsertWinner {
  playerInitials: string;
  gameName: string;
  gameImageUrl: string;
  amount: number;
}

