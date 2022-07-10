import type { IHouse } from '@/types/IHouse'
import type { ISimpleImage } from '@/types/ICustomer'

export interface ICountry {
  country_count: number
  country_houses: IHouse[]
  description: string
  id: number
  image: ISimpleImage
  image_preview: ISimpleImage
  name: string
}