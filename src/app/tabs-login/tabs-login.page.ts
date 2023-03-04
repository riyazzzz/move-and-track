import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Platform } from '@ionic/angular';
import { app } from 'src/environments/environment';

@Component({
  selector: 'app-tabs-login',
  templateUrl: './tabs-login.page.html',
  styleUrls: ['./tabs-login.page.scss'],
})
export class TabsLoginPage implements OnInit {

  @ViewChild('myTab',{ static : false}) myTab;
  appName: string;
  selectedTab: any;
  loginForUser: string;
  loginForDealer: string;
  status: string;
  constructor(
    private activatedRoute:ActivatedRoute,
    private platform : Platform,
    private router: Router
    ) { }
    myPlatform;
    tabChanged(){
      this.selectedTab = this.myTab.getSelected();
    }
    changeModule(data){
      if(data=="user"){
        this.router.navigateByUrl("tabs-login/members/login")
        document.location.href = 'index.html';
      }else{
        this.router.navigateByUrl("tabs-login/dealarlogin/login")
      }
    }

    ngOnInit() {
      this.myPlatform = this.platform.platforms()[0];
      if(this.myPlatform == 'tablet'){
        this.myPlatform = 'desktop';
      }
      this.appName = app.appName;
       this.status = this.activatedRoute.snapshot.children[0].paramMap.get('type');
      this.loginForUser = "/members/login";
      this.loginForDealer = "/dealarlogin/login";
    }
    

}
