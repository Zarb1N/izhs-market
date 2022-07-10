import type { ICustomer, ISimpleImage } from '@/types/ICustomer';
import type { IHouse } from "@/types/IHouse"

export interface IBuilder {
  id: number,
  name: string,
  staff_id: number,
  image: ISimpleImage,
  image_preview: ISimpleImage,
  feedbacks: {
    estimation_speed: number,
    estimation_quality: number,
    estimation_communication: number,
    description_speed: string,
    description_quality: string,
    description_communication: string,
    customers: ICustomer[]
  },
  "builders_count": number,
  "builders_houses": IHouse[]
}