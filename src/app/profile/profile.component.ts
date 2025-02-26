import { Component } from '@angular/core';
import {UserService} from "../../services/user.service";
import {NgFor, NgIf} from "@angular/common";
import {UserOrderModel} from "../../models/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {PetService} from "../../services/pet.service";
import {AlertService} from "../../services/alert.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, NgFor],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  public userService = UserService.getInstance()
  public petService = PetService.getInstance()

  public orders: UserOrderModel[] = []

  constructor(private router: Router, private route: ActivatedRoute) {
    if (!this.userService.hasActive()) {
      this.router.navigate(['/login'], { relativeTo: this.route })
      return
    }
    this.loadOrders()
  }

  private loadOrders() {
    try {
      this.orders = this.userService.getUserOrders()!
      if (this.orders.length == 0) return

       // Retrieve pets by id from orders
      this.petService.getPetsByIds(this.orders.map(o => o.id))
      console.log(this.orders.map(o => o.id))
    } catch (e) {
      this.userService.logout()
      this.router.navigate(['/login'], { relativeTo: this.route })
    }
  }

  public doResetPassword() {
    const input = prompt('Enter your new password')
    if (input == null) {
      AlertService.error('Password reset failed','Password cannot be empty!')
      return
    }

    this.userService.changePassword(input as string)
  }

  public details(id: number) {
    this.router.navigate([`/pet/${id}`], { relativeTo: this.route });
  }

  public pay(order: UserOrderModel) {
    this.userService.changeOrderStatus('paid', order)
    this.loadOrders()
  }

  public rate(order: UserOrderModel) {
    Swal.fire({
      title: 'Leave a rating',
      text: 'Rate your pet?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText:"<i class=\"fa-solid fa-star\"></i>" +
        "<i class=\"fa-solid fa-star\"></i>" +
        "<i class=\"fa-solid fa-star\"></i>" +
        "<i class=\"fa-solid fa-star\"></i>" +
        "<i class=\"fa-solid fa-star\"></i>",
      cancelButtonText: 'cancel',
      customClass: {
        popup: 'card',
        // denyButton: 'btn btn-danger',
        cancelButton: 'btn btn-primary'
      }
    }).then(res => {
      if (res.isConfirmed) {
        // Korinsik je zadovoljan
        this.userService.changeOrderRating(5, order)
        this.loadOrders()
        return
      }

      if (res.isDenied) {
        // Korinsik je nezadovoljan
        // this.userService.changeOrderRating('d', order)
        this.loadOrders()
        return
      }
    })
  }

  public cancel(order: UserOrderModel) {
    this.userService.changeOrderStatus('canceled', order)
    this.loadOrders()
  }
}
