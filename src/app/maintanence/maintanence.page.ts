import { Component, OnInit } from '@angular/core';
import {  Platform, MenuController } from '@ionic/angular';
import { app } from 'src/environments/environment';
@Component({
  selector: 'app-maintanence',
  templateUrl: './maintanence.page.html',
  styleUrls: ['./maintanence.page.scss'],
})
export class MaintanencePage implements OnInit {

  myPlatform;
  isDeleteShow: any = false;
  appName: string;
  constructor(
      private platform:Platform,
  ) { }
  
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    this.appName = app.appName;
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
    let localMainMenu = JSON.parse(localStorage.mainMenu)
    this.isDeleteShow = localMainMenu.includes("Delete")
  }

}
