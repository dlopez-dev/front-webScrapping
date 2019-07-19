import { NewsServices } from './../../services/NewsServices';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

import { MessageService } from '../../services/MessageService';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {
  message: string = "Nacionales";
  subscription: Subscription;
  showinfo: boolean;

  constructor(private messageService: MessageService, private NewsServices:NewsServices) {
    this.showinfo = false;
    if (sessionStorage.getItem('page')) {
      this.loadNewsforType('Nacionales');
      sessionStorage.removeItem('page');
    }
    this.subscription = this.messageService.getMessage().subscribe(message => {
      if (message) {
        this.message = message.text;
        this.loadNewsforType(this.message);
      }
      ;
    });
  }

  loadNewsforType(message: string) {
    this.NewsServices.requestNews(message).subscribe(res=>{
      console.log(res);
    });
    this.showinfo = true;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit() {

  }
}
