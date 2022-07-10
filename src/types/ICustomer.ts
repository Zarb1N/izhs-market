export interface ISimpleImage {
  url: string
}

export interface ICustomer {
  name: string,
  estimation_customer: number,
  advantage: string,
  disadvantages: string,
  date: string,
  images: ISimpleImage[]
}