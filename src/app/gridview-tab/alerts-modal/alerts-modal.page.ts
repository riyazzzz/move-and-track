import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { app } from 'src/environments/environment';
@Component({
  selector: 'app-alerts-modal',
  templateUrl: './alerts-modal.page.html',
  styleUrls: ['./alerts-modal.page.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0.7 }),
            animate('0.7s ease-out')
          ]
        )
      ]
    )
  ]
})
export class AlertsModalPage implements OnInit {
  totalAlert: number = 0;
  showSearch: boolean = false;
  initialHeader: boolean = true;
  searchInput: string;
  currentPlateno: any;
  appName: string;
  searchActivity(task) {
    if (task == "open") {
      this.showSearch = true;
    } else {
      this.showSearch = false;
      this.searchInput = '';

    }
  }
  totalAlerts(event) {
    this.totalAlert = event;
  }

  scroll(event) {
    if (event.detail.scrollTop > 0) {
      this.initialHeader = false;
    } else {
      this.initialHeader = true;
    }
  }

  getBack() {
    this.modalController.dismiss();
  }
  constructor(private modalController: ModalController) { }

  ngOnInit( ) {
    this.currentPlateno = JSON.parse(localStorage.selectedVin).plateNo;
    this.appName =  app.appName;
  }

}
