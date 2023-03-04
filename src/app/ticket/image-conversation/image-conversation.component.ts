import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-image-conversation',
  templateUrl: './image-conversation.component.html',
  styleUrls: ['./image-conversation.component.scss'],
})
export class ImageConversationComponent implements OnInit {
 @Input()image;
 imageData;
 
  constructor(public modalController:ModalController) { }
  getBack(){
   this.modalController.dismiss();
  }
  ngOnInit() {
    this.imageData = this.image;
    console.log(this.imageData,'iam image popup');
  }
  ngOnChanges() {
    this.imageData=this.image;
    console.log(this.imageData,'iam image popup');
  }



}
