import type { ISimpleImage } from '@/types/ICustomer';
import type { IHouse } from '@/types/IHouse';

export interface IArchitecture {
  architecture_houses: IHouse[]
  count_houses: number
  id: number
  image: ISimpleImage
  style: string
}