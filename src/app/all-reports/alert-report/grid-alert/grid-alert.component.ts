import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-alert',
  templateUrl: './grid-alert.component.html',
  styleUrls: ['./grid-alert.component.scss'],
})
export class GridAlertComponent implements OnInit {
@Input() alertReport: string;
@Input() search;
gridView;

reports= 'reports';
  constructor() { }

  ngOnInit() {
    this.gridView = this.alertReport
  }

}
