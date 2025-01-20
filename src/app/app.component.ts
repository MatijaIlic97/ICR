import {Component} from '@angular/core';
import {RouterLink, RouterOutlet} from '@angular/router';
import {NgFor, NgIf} from "@angular/common";
import {MessageModel} from "../models/message.model";
import {FormsModule} from "@angular/forms";
import {HttpClientModule, HttpErrorResponse} from "@angular/common/http";
import {ChatbotService} from "../services/chatbot.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NgIf, NgFor, FormsModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ICR';
  year = new Date().getFullYear();

  chatbotService = ChatbotService.getInstance()
  waitingForResponse = false
  isChatVisible = false
  userMessage: string = ''
  botThinkingPlaceholder = 'Thinking...'
  messages: MessageModel[] = [{type: "bot", text: "How can i help?"}]

  toggleChat() {
    this.isChatVisible = !this.isChatVisible;
  }

  pushMessage(message: MessageModel) {
    if (message.type == 'bot' && message.text == this.botThinkingPlaceholder)
      this.waitingForResponse = true

    if (message.type == 'bot' && message.text != this.botThinkingPlaceholder) {
      // Try to find the thinking placeholder message
      for (let m of this.messages) {
        if (m.type == 'bot' && m.text == this.botThinkingPlaceholder) {
          m.text = message.text
          this.waitingForResponse = false
          return
        }
      }
    }

    this.messages.push(message);
    // Save messages in local storage
    localStorage.setItem('messages', JSON.stringify(this.messages));
  }

  sendMessage() {
    // wating for response, user can't send new messages
    if (this.waitingForResponse) return

    if (this.userMessage.trim()) {
      const trimmedInput = this.userMessage;
      // Reset user input
      this.userMessage = '';

      this.pushMessage({type: 'user', text: trimmedInput});
      this.pushMessage({type: 'bot', text: this.botThinkingPlaceholder})
      this.chatbotService.sendRasaMessage(trimmedInput).subscribe(rsp => {
          if (rsp.length == 0) {
            this.pushMessage({
              type: 'bot',
              text: 'Sorry I did not understand your question.'
            });
            return;
          }

          rsp.map(msg => {
            // // Handle bot message (including images, flight cards, etc.)
            if (msg.image) {
              return `<img src="${msg.image}" width="200" alt="${msg.image}">`;
            }
            // if (msg.attachment) {
            //   let html = '';
            //   for (const item of msg.attachment) {
            //     html += `
            //     <div class="card card-chat">
            //       <img src="${[this.petService.getDestinationImage(item.destination)]}" class="card-img-top" alt="${item.destination}">
            //       <div class="card-body">
            //         <h3 class="card-title">${item.destination}</h3>
            //         <p class="card-text">${this.webService.formatDate(item.scheduledAt)} (${item.flightNumber})</p>
            //       </div>
            //       <div class="card-body">
            //         <a class="btn btn-primary" href="/flight/${item.id}">
            //           <i class="fa-solid fa-up-right-from-square"></i> Details
            //         </a>
            //         <a class="btn btn-success ms-1" href="/list">
            //           <i class="fa-solid fa-magnifying-glass"></i> Browse All
            //         </a>
            //       </div>
            //     </div>
            //   `;
            //   }
            //   return html;
            // }
            return msg.text;
          })
            .forEach(msg => {
              this.pushMessage({
                type: 'bot',
                text: msg!
              });
            });
        },
        (err: HttpErrorResponse) => {
          this.pushMessage({
            type: 'bot',
            text: 'Sorry, I am not available at the moment.'
          });
        }
      );
    }
  }
}
