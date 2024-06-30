import type { Card } from "./Card"

export interface Category {
    id: number
    name: string
    cards: Card[],
    theme: string,
  }
  