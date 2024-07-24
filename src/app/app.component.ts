import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WebsocketService } from './services/websocket.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  title = 'websockets-angular';
  messages: any[] = []
  input: string = ''

  constructor(readonly websocketService: WebsocketService) { }

  ngOnInit(): void {
    this.websocketService.messages$.subscribe((msg) => this.messages.push(msg))
  }

  sendMessage(): void {
    if (this.input) {
      this.websocketService.sendMessage({
        content: this.input
      })
    }
  }
}
