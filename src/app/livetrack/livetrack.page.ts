import { Component, OnInit } from '@angular/core';
import { app } from 'src/environments/environment';

@Component({
  selector: 'app-livetrack',
  templateUrl: './livetrack.page.html',
  styleUrls: ['./livetrack.page.scss'],
})
export class LivetrackPage implements OnInit {
  headerText;
  appName: string;
  constructor() { }

  ionViewWillEnter(){
    console.log('liveTracck hit');
  }
  ngOnInit(){
    this.headerText = JSON.parse(localStorage.selectedVin).plateNo;
    this.appName = app.appName
  }
}
