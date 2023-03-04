import { Component, OnInit } from '@angular/core';
import {  ModalController, Platform } from '@ionic/angular';
import {AddTicketComponent} from './add-ticket/add-ticket.component';
import {Location} from '@angular/common'
@Component({
  selector: 'app-ticket',
  templateUrl: './ticket.page.html',
  styleUrls: ['./ticket.page.scss'],
})
export class TicketPage implements OnInit {
  myPlatform: any;
  sub: string;
  
  constructor(
    private platform: Platform,
    private modalController:ModalController,
    private location:Location,
  
  ) { }
 getBack(){
   this.location.back();
 }
 
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    this.sub =localStorage.getItem('subject');
  }
  


}
