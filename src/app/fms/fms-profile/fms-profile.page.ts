import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { app } from 'src/environments/environment';

@Component({
  selector: 'app-fms-profile',
  templateUrl: './fms-profile.page.html',
  styleUrls: ['./fms-profile.page.scss'],
})
export class FmsProfilePage implements OnInit {
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
