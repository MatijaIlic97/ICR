import {Injectable} from '@angular/core';
import {PetModel} from "../models/pet.model";

@Injectable({
  providedIn: 'root'
})
export class PetService {
  public pets: PetModel[]

  private static instance: PetService

  constructor() {
    this.pets = [
      {
        id: 1,
        age: 3,
        description: "Swiss shepard",
        gender: "male",
        image: "tozla.jpg",
        name: "Tozla",
        price: 1800,
        score: 5,
        size: "M",
        species: "dog"
      },
      {
        id: 2,
        age: 2,
        description: "German shepard",
        gender: "female",
        image: "mika.jpg",
        name: "Mika",
        price: 300,
        score: 5,
        size: "M",
        species: "dog"
      },
      {
        id: 3,
        age: 3,
        description: "Russian blue",
        gender: "male",
        image: "pera.jpg",
        name: "Pera",
        price: 300,
        score: 5,
        size: "M",
        species: "cat"
      },
      {
        id: 4,
        age: 5,
        description: "Tabby",
        gender: "male",
        image: "marko.jpg",
        name: "Marko",
        price: 150,
        score: 5,
        size: "M",
        species: "cat"
      },
      {
        id: 5,
        age: 2,
        description: "Holland lop",
        gender: "female",
        image: "zeka.jpg",
        name: "Zeka",
        price: 150,
        score: 5,
        size: "S",
        species: "rabbit"
      },
      {
        id: 6,
        age: 3,
        description: "Chekered giant rabbit",
        gender: "male",
        image: "dzin.jpg",
        name: "Dzin",
        price: 130,
        score: 5,
        size: "L",
        species: "rabbit"
      },
      {
        id: 7,
        age: 1,
        description: "Syrian hamster",
        gender: "female",
        image: "sirko.jpg",
        name: "Sirko",
        price: 50,
        score: 4,
        size: "S",
        species: "hamster"
      },
      {
        id: 8,
        age: 1,
        description: "Chinese hamster",
        gender: "male",
        image: "chizl.jpg",
        name: "Chizzle",
        price: 60,
        score: 4.5,
        size: "S",
        species: "hamster"
      },
      {
        id: 9,
        age: 2,
        description: "Cockatiel",
        gender: "female",
        image: "kokoreko.jpg",
        name: "Kokoreko",
        price: 80,
        score: 4,
        size: "S",
        species: "bird"
      },
      {
        id: 10,
        age: 1,
        description: "Blue-headed parrot",
        gender: "male",
        image: "plavko.jpg",
        name: "Plavko",
        price: 90,
        score: 5,
        size: "S",
        species: "bird"
      },
    ];
  }

  public static getInstance() {
    if (this.instance == undefined)
      this.instance = new PetService()
    return this.instance
  }

  public getAllPets() {
    return this.pets;
  }

  public getPetsById(id: number) {
    return this.pets[id];
  }

  public getPetsByIds(ids: number[]) {
    let petsToReturn:PetModel[] = [];
    for (let num in ids){
      petsToReturn.push(this.pets[num]);
    }
    return petsToReturn;
  }

  public getPetNameById(id: number) {
    return this.pets[id].name;
  }

  public getPetPriceById(id: number) {
    return this.pets[id].price;
  }
}
