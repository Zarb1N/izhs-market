import type { IHouse } from "@/types/IHouse";

export interface ISet {
  id: number
  name: string
  preview_main: boolean
  budge: string
  budge_card: string
  image: null | { url: string }
  count_houses: number
  houses_in_sets: IHouse[]
}