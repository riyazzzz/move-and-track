import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { app } from 'src/environments/environment';

@Component({
  selector: 'app-diagnosis-user',
  templateUrl: './diagnosis-user.page.html',
  styleUrls: ['./diagnosis-user.page.scss'],
})
export class DiagnosisUserPage implements OnInit {
  app: any={logo:'logo.png'};
  myPlatform: any;
  appName: string;
  
  constructor(
    public platform: Platform
  ) { }

  ngOnInit() {
  this.appName = app.appName
    this.app["logo"] = localStorage.companyLogo;
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }  }
    
}
