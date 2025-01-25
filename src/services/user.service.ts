import { Injectable } from '@angular/core';
import {UserModel} from "../models/user.model";
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
}
