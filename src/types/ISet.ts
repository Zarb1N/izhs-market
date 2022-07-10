import type { IHouse } from "@/types/IHouse";
import type { ISimpleImage } from "@/types/ICustomer";

export interface ISet {
  id: number
  name: string
  preview_main: boolean
  budge: string
  budge_card: string
  image: null | ISimpleImage
  count_houses: number
  houses_in_sets: IHouse[]
}