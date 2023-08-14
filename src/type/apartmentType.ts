export interface IReview {
  nameUser: string|undefined;
  review: string
}

export interface IApartment {
  [x: string]: any
  id: number
  image: string
  price: string
  place: string
  phone: string
  description: string
  shortDescription: string
  reviews: [] | [IReview]
}
