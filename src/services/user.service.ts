import { Injectable } from '@angular/core';
import {UserModel, UserOrderModel} from "../models/user.model";
import {AlertService} from "./alert.service";

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private static instance: UserService

  constructor() {
    if (!localStorage.getItem('users'))
      this.createDefault()
  }

  private createDefault() {
    const user: UserModel = {
      email: 'matijailic@gmail.com',
      password: 'matija',
      pets: []
    }

    localStorage.setItem('users', JSON.stringify([user]))
  }

  public login(email: string, password: string) {
    if (!localStorage.getItem('users'))
      this.createDefault()

    const users: UserModel[] = JSON.parse(localStorage.getItem('users')!)
    const active = users.find(u => u.email == email && u.password == password)

    if (!active) {
      AlertService.error('Login Failed', 'Username or password is incorrect!')
      return
    }

    localStorage.setItem('active', active.email)
  }

  public logout() {
    localStorage.removeItem('active')
  }

  public signup(email: string, password: string) {
    if (!localStorage.getItem('users'))
      this.createDefault()

    const users: UserModel[] = JSON.parse(localStorage.getItem('users')!)
    users.push({
      email: email,
      password: password,
      pets: []
    })

    localStorage.setItem('users', JSON.stringify(users))
  }

  public static getInstance() {
    if (this.instance == undefined)
      this.instance = new UserService()
    return this.instance
  }

  public hasActive() {
    return localStorage.getItem('active') != null
  }

  public getActive() {
    return localStorage.getItem('active') ? localStorage.getItem('active') : 'N/A'
  }

  public getUserOrders() {
    if (!this.hasActive()) {
      AlertService.error('Orders failed to load', 'You need to be signed in to browse or change your orders!')
      return
    }

    if (!localStorage.getItem('users'))
      this.createDefault()

    const users: UserModel[] = JSON.parse(localStorage.getItem('users')!)
    const active = users.find(u => u.email == this.getActive())

    if (!active) throw Error('NO ACTIVE USER')
    return active.pets
  }

  public changePassword(newPassword: string) {
    if (!this.hasActive()) {
      AlertService.error('Password change failed', 'You need to be signed in to change your password!')
      return
    }

    if (!localStorage.getItem('users'))
      this.createDefault()

    const users: UserModel[] = JSON.parse(localStorage.getItem('users')!)
    users.forEach(u => {
      if (u.email == this.getActive()) {
        u.password = newPassword
      }
    })

    localStorage.setItem('users', JSON.stringify(users))
  }

  public changeOrderStatus(status: 'reserved' | 'paid' | 'canceled', order: UserOrderModel) {
    if (!this.hasActive()) {
      AlertService.error('Order failed to change', 'You need to be signed in to browse or change your orders!')
      return
    }

    if (!localStorage.getItem('users'))
      this.createDefault()

    const users: UserModel[] = JSON.parse(localStorage.getItem('users')!)
    const active = users.find(u => u.email == this.getActive())

    if (!active) {
      AlertService.error('Order status failed to change', 'You need to be signed in to browse or change your orders!')
      return
    }

    active.pets.forEach(a => {
      if (a.created == order.created) {
        a.status = status
      }
    })

    localStorage.setItem('users', JSON.stringify(users))
  }

  public addToCart(petId: number) {
    if (!this.hasActive()) {
      AlertService.error('You have to be logged in', 'You need to be signed in order to add items to the cart!')
      return
    }

    if (!localStorage.getItem('users'))
      this.createDefault()

    const users: UserModel[] = JSON.parse(localStorage.getItem('users')!)
    users.forEach(u => {
      if (u.email == this.getActive()) {
        u.pets.push({
          id: petId,
          status: 'reserved',
          rating: 0,
          created: new Date().getTime().toString()
        })
      }
    })

    localStorage.setItem('users', JSON.stringify(users))
  }

}
