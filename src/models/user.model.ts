import {PetModel} from "./pet.model";

export interface UserModel {
  email: string
  password: string
  pets: UserOrderModel[]
}

export interface UserOrderModel {
  id: number,
  pet?: PetModel
  status: 'reserved' | 'paid' | 'canceled'
  rating: number
  created: string
}
