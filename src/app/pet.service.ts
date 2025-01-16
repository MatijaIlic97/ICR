import {Injectable} from '@angular/core';
import {PetModel} from "../models/pet.model";

@Injectable({
  providedIn: 'root'
})
export class PetService {
  public pets: PetModel[]

  constructor() {
    this.pets = [
      {
        id: 1,
        age: 1,
        description: "lep",
        gender: "male",
        image: "dog.jpg",
        name: "Kucaa",
        price: 399,
        score: 5,
        size: "M",
        species: "dog"
      },
      {
        id: 2,
        age: 2,
        description: "lepa",
        gender: "male",
        image: "cat.jpg",
        name: "maca",
        price: 399,
        score: 5,
        size: "M",
        species: "cat"
      },
      {
        id: 3,
        age: 1,
        description: "lep",
        gender: "male",
        image: "dog.jpg",
        name: "kuca",
        price: 399,
        score: 5,
        size: "M",
        species: "dog"
      },
      {
        id: 4,
        age: 2,
        description: "lepa",
        gender: "male",
        image: "cat.jpg",
        name: "maca",
        price: 399,
        score: 5,
        size: "M",
        species: "cat"
      },
    ];
  }

  public getAllPets() {
    return this.pets;
  }

  public getPetsById(id: number) {
    return this.pets[id];
  }
}
