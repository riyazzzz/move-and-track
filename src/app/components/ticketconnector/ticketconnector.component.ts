import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-ticketconnector',
  templateUrl: './ticketconnector.component.html',
  styleUrls: ['./ticketconnector.component.scss'],
})
export class TicketconnectorComponent implements OnInit {
  @Input() items;
  id:any;
  ticketValue = {
    "2": 'open',
    "3": 'pending',
    "4": 'Resolved',
    "5": 'closed',
    undefined:""
  }
  
  constructor() { }


  getBg(data){
    this.id=localStorage.getItem('coversationId');
    if(data == this.id)
    return "front";
  }

  ngOnInit() {
  
   }

}
