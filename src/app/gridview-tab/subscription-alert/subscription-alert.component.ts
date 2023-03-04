import { Component, OnInit , Input} from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-subscription-alert',
  templateUrl: './subscription-alert.component.html',
  styleUrls: ['./subscription-alert.component.scss'],
})
export class SubscriptionAlertComponent implements OnInit {

  @Input()value;
  expiryDatas;
  constructor(
    private modalController: ModalController,
  ) { }
  async closeModal() {
    this.modalController.dismiss();
  }
  ngOnInit(
  
  ){
    this.expiryDatas=this.value.assets
  }

}
