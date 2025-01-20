import {Component} from '@angular/core';
import {NgFor, NgIf} from "@angular/common";
import {PetModel} from "../../models/pet.model";
import {RouterLink} from "@angular/router";
import {PetService} from "../../services/pet.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public pets: PetModel[];

  constructor(private petService: PetService) {
    this.pets = petService.getAllPets()
  }

}
