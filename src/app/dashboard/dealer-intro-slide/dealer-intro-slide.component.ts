import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-dealer-intro-slide',
  templateUrl: './dealer-intro-slide.component.html',
  styleUrls: ['./dealer-intro-slide.component.scss'],
})
export class DealerIntroSlideComponent implements OnInit {
logo;
  constructor(
    private modalController: ModalController
  ) { }
  dismiss(){
    localStorage.setItem('delarIntro', "true")
    this.modalController.dismiss()
  }
  ngOnInit() {
    this.logo = localStorage.companyLogo
  }

}
