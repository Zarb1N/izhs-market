import type { IImage } from "@/types/IDeviceState"
import type { ISimpleImage } from "@/types/ICustomer"

export interface IHouse {
  id: number
  name: string
  square: number
  club_id: number[]
  country_id: number
  architecture_id: number
  staff_id_discussions: number
  sets_id: number
  publish: boolean
  image_preview: ISimpleImage
  images: [null, IImage]
  price_history: IPriceHistory[]
  discussions: IDiscussion[]
}

export interface IPriceHistory {
  price: number
  date: string
  builders_id: number
  equipments_id: number
}

export interface IDiscussion {
  question: string
  answer: string
  question_date: string
}