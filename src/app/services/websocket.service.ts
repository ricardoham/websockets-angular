import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  // FIXME remove the any values after tests

  private sub: Subject<any> = new Subject();
  private stompClient: Client | undefined

  messages$: Observable<any> = this.sub.asObservable()

  constructor() { }

  connect() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/websocket',
      reconnectDelay: 3000,
    })

    this.stompClient.onConnect = () => {
      this.stompClient?.subscribe("/topic/events", (msg: Message) => {
        this.sub.next(JSON.parse(msg.body))
      })
    }

    this.stompClient.activate();
  }

  sendMessage(msg: any) {
    this.stompClient?.publish({
      destination: "app/echo",
      body: JSON.stringify(msg)
    })
  }
}
