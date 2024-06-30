import type { Category } from "./Category"

export interface Theme {
    id: number
    name: string
    categories: Category[]
  }
  