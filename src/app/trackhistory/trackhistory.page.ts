import { Component, OnInit } from '@angular/core';
import { app } from 'src/environments/environment';

@Component({
  selector: 'app-trackhistory',
  templateUrl: './trackhistory.page.html',
  styleUrls: ['./trackhistory.page.scss'],
})
export class TrackhistoryPage implements OnInit {
  appName: string;

  constructor() { }
  headerText;
  ngOnInit() {
    this.headerText = JSON.parse(localStorage.selectedVin).plateNo;
    this.appName = app.appName;
  }

}
