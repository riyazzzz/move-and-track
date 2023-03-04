import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import { app } from 'src/environments/environment';

@Component({
  selector: 'app-fms-manage',
  templateUrl: './fms-manage.page.html',
  styleUrls: ['./fms-manage.page.scss'],
})
export class FmsManagePage implements OnInit {
  app: any={logo:'logo.png'};
  myPlatform: any;
  appName: any;
  constructor(    public platform: Platform) { }

  ngOnInit() {
    this.appName = app.appName;
    // this.app["logo"] = localStorage.companyLogo;
    if(localStorage.getItem('fmslogin') == 'FMS')	
     {	
       this.app["logo"] = localStorage.getItem('fmslogo');	
     }	
     else{	
       this.app["logo"] = localStorage.companyLogo;	
     }
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
  }

}
