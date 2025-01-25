import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {RasaModel} from "../models/rasa.model";


@Injectable({
  providedIn: 'root'
})
export class ChatbotService {
  private client: HttpClient
  private static instance: ChatbotService

  constructor() {
    this.client = inject(HttpClient)
  }

  public static getInstance() {
    if (this.instance == undefined)
      this.instance = new ChatbotService()
    return this.instance
  }

  // private retrieveRasaSession() {
  //   if (!localStorage.getItem('session'))
  //     localStorage.setItem('session', uuidv4())
  //
  //   return localStorage.getItem('session')
  // }

  public sendRasaMessage(value: string) {
    const url = 'http://localhost:5005/webhooks/rest/webhook'
    return this.client.post<RasaModel[]>(url,
      {
        sender: "user",
        // sender: this.retrieveRasaSession(),
        // email: localStorage.getItem('active') ? localStorage.getItem('active') : null,
        message: value
      },
      {
        headers: {
          'Accept': 'application/json'
        }
      }
    )
  }
}
