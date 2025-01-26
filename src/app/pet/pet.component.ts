import {Component} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {PetService} from "../../services/pet.service";
import {PetModel} from "../../models/pet.model";
import {AlertService} from "../../services/alert.service";
import {UserService} from "../../services/user.service";

@Component({
  selector: 'app-pet',
  standalone: true,
  imports: [],
  templateUrl: './pet.component.html',
  styleUrl: './pet.component.css'
})
export class PetComponent {
  public pet: PetModel;
  public userService = UserService.getInstance()

  constructor(private router: Router, private petService: PetService, private route: ActivatedRoute) {
    this.pet = petService.getPetsById(route.snapshot.params['id'] - 1);
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
