import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-diagnosis',
  templateUrl: './diagnosis.page.html',
  styleUrls: ['./diagnosis.page.scss'],
})
export class DiagnosisPage implements OnInit {
  app: any={logo:'logo.png'};
  myPlatform: any;
  

  constructor(
    public platform: Platform
  ) { 
  
  }

  ngOnInit() {
    this.app["logo"] = localStorage.companyLogo;
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }  }

}
