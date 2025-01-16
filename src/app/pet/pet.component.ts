import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PetService} from "../pet.service";
import {PetModel} from "../../models/pet.model";

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent {
  public pet: PetModel;

  constructor(private route: ActivatedRoute, private petService: PetService) {
    this.pet = petService.getPetsById(route.snapshot.params['id']-1);
  }

}
