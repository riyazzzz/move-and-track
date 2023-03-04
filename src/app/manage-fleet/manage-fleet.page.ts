import { Route } from '@angular/compiler/src/core';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { app } from 'src/environments/environment';
@Component({
  selector: 'app-manage-fleet',
  templateUrl: './manage-fleet.page.html',
  styleUrls: ['./manage-fleet.page.scss'],
})
export class ManageFleetPage implements OnInit {
  paramMap: string;
  app: any={logo:'logo.png'};
  myPlatform: any;
  appName: string;
  constructor(
    private router : Router,
    private route: ActivatedRoute,
    public platform: Platform,
  ) { }

  ngOnInit() {
    this.paramMap = this.route.snapshot.paramMap.get('pagecomp')
    // this.app["logo"] = localStorage.companyLogo;
     // this.app["logo"] = localStorage.companyLogo;	
     if(localStorage.getItem('fmslogin') == 'FMS')	
     {	
       this.app["logo"] = localStorage.getItem('fmslogo');	
     }	
     else{	
       this.app["logo"] = localStorage.companyLogo;	
     }
    this.appName = app.appName;
    this.myPlatform = this.platform.platforms()[0];
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
  }

}
