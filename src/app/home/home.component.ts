import {Component} from '@angular/core';
import {NgFor, NgIf} from "@angular/common";
import {PetModel} from "../../models/pet.model";
import {ActivatedRoute, Router, RouterLink} from "@angular/router";
import {PetService} from "../../services/pet.service";
import {UserService} from "../../services/user.service";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NgIf, NgFor, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  public pets: PetModel[];
  public userService = UserService.getInstance()

  constructor(private petService: PetService,private router: Router, private route: ActivatedRoute) {
    this.pets = petService.getAllPets()
  }

  public doAddToCart(id: number) {
    AlertService.question('Add to cart', `Do you want to add pet ${id} to cart?`)
      .then(rsp => {
        if (rsp.isConfirmed) {
          if (!this.userService.hasActive()) {
            AlertService.error('You have to be signed in', 'You cant add pets to the cart if you are not signed in!')
            this.router.navigate(['/login'], { queryParams: { from: '/pet/' + id }, relativeTo: this.route });
            return
          }

          this.userService.addToCart(id)
          this.router.navigate(['/profile'], { relativeTo: this.route })
        }
      })
  }

}
