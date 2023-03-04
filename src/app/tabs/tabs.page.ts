import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Platform } from '@ionic/angular';
import { app } from 'src/environments/environment';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.page.html',
  styleUrls: ['./tabs.page.scss'],
})

export class TabsPage implements OnInit {
  @ViewChild('myTabs',{ static : false}) myTabs;
  appName: string;
  constructor(
    private activatedRoute:ActivatedRoute,
    private platform : Platform
    ) { }
    myPlatform;
    status: string;
    gridViewUrl: string;
    mapViewUrl: string;
    selectedTab: string;
    alertsUrl: string;
    dashboardUrl: string;
    tabChanged(){
      this.selectedTab = this.myTabs.getSelected();
    }
  
    ngOnInit() {
      this.myPlatform = this.platform.platforms()[0];
      if(this.myPlatform == 'tablet'){
        this.myPlatform = 'desktop';
      }
      this.appName = app.appName;
      this.status = this.activatedRoute.snapshot.children[0].paramMap.get('type');
      this.dashboardUrl = "members/dashboard";
      this.mapViewUrl = "mapview/All";
      this.gridViewUrl = "gridview/All";
      this.alertsUrl = "alerts/"+this.status;
    }
    
  }
  