import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WebsocketService } from './services/websocket.service';
import { ChatService } from './services/chat.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'mantendor';

  constructor(public router: Router,
              public ws: WebsocketService,
              public chat: ChatService) {
  }


  ngOnInit() {
    this.chat.getPrivates()
              .subscribe( msg => {
              console.log('privado', msg);
              });
  }
}
