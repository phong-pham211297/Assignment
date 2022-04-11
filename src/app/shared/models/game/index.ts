export interface Game {
  id: string;
  name: string;
  image: string;
  categories: string[];
  amount: number;
  jackpot: number;
  ribbon?: string;
}
