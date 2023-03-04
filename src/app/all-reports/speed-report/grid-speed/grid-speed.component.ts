import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-grid-speed',
  templateUrl: './grid-speed.component.html',
  styleUrls: ['./grid-speed.component.scss'],
})
export class GridSpeedComponent implements OnInit {
@Input() speedReport;
gridView;
reportName = 'speed'
  constructor(
    private location: Location
  ) { }
  getBack() {
    this.location.back();
  }
  ngOnInit() {
    this.gridView = this.speedReport
  }

}
