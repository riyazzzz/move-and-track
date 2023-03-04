import { Component, Input, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';
import {  app, serverUrl } from "./../../environments/environment";
@Component({
  selector: 'app-trip-summary',
  templateUrl: './trip-summary.page.html',
  styleUrls: ['./trip-summary.page.scss'],
})
export class TripSummaryPage implements OnInit {
  @Input() vinGrid;
  @Input() gridLiveChange;
  appName: string;
  app: any = {logo:'logo.png'};
  myPlatform: string;
  constructor(
    private platform: Platform
  ) { }

  ngOnInit() {
    this.app["logo"] = localStorage.companyLogo;
    this.myPlatform = this.platform.platforms()[0];
    this.appName = app.appName;
    if(this.myPlatform == 'tablet'){
      this.myPlatform = 'desktop';
    }
  }

}
