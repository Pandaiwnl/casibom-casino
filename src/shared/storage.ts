import { type User, type InsertUser, type Game, type InsertGame, type Winner, type InsertWinner } from "./schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getGames(): Promise<Game[]>;
  getGame(id: string): Promise<Game | undefined>;
  createGame(game: InsertGame): Promise<Game>;
  
  getWinners(): Promise<Winner[]>;
  getRecentWinners(limit?: number): Promise<Winner[]>;
  createWinner(winner: InsertWinner): Promise<Winner>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private games: Map<string, Game>;
  private winners: Map<string, Winner>;

  constructor() {
    this.users = new Map();
    this.games = new Map();
    this.winners = new Map();
    
    this.initializeGames();
    this.initializeWinners();
  }

  private initializeGames() {
    const sampleGames: InsertGame[] = [
      {
        name: "Gates of Olympus",
        imageUrl: "/images/1.png",
        isHot: true,
        isNew: false,
        category: "slots"
      },
      {
        name: "Sweet Bonanza",
        imageUrl: "/images/2.png",
        isHot: false,
        isNew: true,
        category: "slots"
      },
      {
        name: "Starlight Princess",
        imageUrl: "/images/3.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "Book of Dead",
        imageUrl: "/images/4.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "Starburst",
        imageUrl: "/images/5.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "Lucky Clover",
        imageUrl: "/images/6.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "Big Bass Bonanza",
        imageUrl: "/images/7.png",
        isHot: true,
        isNew: false,
        category: "slots"
      },
      {
        name: "Sugar Rush",
        imageUrl: "/images/8.png",
        isHot: false,
        isNew: true,
        category: "slots"
      },
      {
        name: "Gonzo's Quest",
        imageUrl: "/images/9.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "Dead or Alive",
        imageUrl: "/images/10.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "Reactoonz",
        imageUrl: "/images/11.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "Jammin' Jars",
        imageUrl: "/images/12.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "Razor Shark",
        imageUrl: "/images/13.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "Money Train",
        imageUrl: "/images/14.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "The Dog House",
        imageUrl: "/images/15.png",
        isHot: false,
        isNew: false,
        category: "slots"
      },
      {
        name: "Fire Joker",
        imageUrl: "/images/16.png",
        isHot: false,
        isNew: false,
        category: "slots"
      }
    ];

    sampleGames.forEach(game => {
      this.createGame(game);
    });
  }

  private initializeWinners() {
    const sampleWinners: InsertWinner[] = [
      {
        playerInitials: "T.S.",
        gameName: "Gates of Olympus",
        gameImageUrl: "/images/1.png",
        amount: 47200
      },
      {
        playerInitials: "H.B.",
        gameName: "Sweet Bonanza",
        gameImageUrl: "/images/2.png",
        amount: 51400
      },
      {
        playerInitials: "R.A.",
        gameName: "Starlight Princess",
        gameImageUrl: "/images/3.png",
        amount: 22882
      },
      {
        playerInitials: "S.K.",
        gameName: "Book of Dead",
        gameImageUrl: "/images/4.png",
        amount: 17145
      },
      {
        playerInitials: "M.Y.",
        gameName: "Starburst",
        gameImageUrl: "/images/5.png",
        amount: 34567
      },
      {
        playerInitials: "D.K.",
        gameName: "Lucky Clover",
        gameImageUrl: "/images/6.png",
        amount: 28920
      }
    ];

    sampleWinners.forEach(winner => {
      this.createWinner(winner);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { 
      ...insertUser, 
      id, 
      balance: insertUser.balance || 0,
      createdAt: new Date()
    };
    this.users.set(id, user);
    return user;
  }

  async getGames(): Promise<Game[]> {
    return Array.from(this.games.values());
  }

  async getGame(id: string): Promise<Game | undefined> {
    return this.games.get(id);
  }

  async createGame(insertGame: InsertGame): Promise<Game> {
    const id = randomUUID();
    const game: Game = { 
      ...insertGame, 
      id,
      isHot: insertGame.isHot ?? null,
      isNew: insertGame.isNew ?? null
    };
    this.games.set(id, game);
    return game;
  }

  async getWinners(): Promise<Winner[]> {
    return Array.from(this.winners.values()).sort((a, b) => 
      new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async getRecentWinners(limit: number = 10): Promise<Winner[]> {
    const allWinners = await this.getWinners();
    return allWinners.slice(0, limit);
  }

  async createWinner(insertWinner: InsertWinner): Promise<Winner> {
    const id = randomUUID();
    const winner: Winner = { 
      ...insertWinner, 
      id, 
      createdAt: new Date()
    };
    this.winners.set(id, winner);
    return winner;
  }
}

export const storage = new MemStorage();

