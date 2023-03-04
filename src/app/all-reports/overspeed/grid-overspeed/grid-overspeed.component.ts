import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-overspeed',
  templateUrl: './grid-overspeed.component.html',
  styleUrls: ['./grid-overspeed.component.scss'],
})
export class GridOverspeedComponent implements OnInit {
@Input() overSpeed;
gridData;
reportName = 'overspeed'
  constructor() { }

  ngOnInit() {
    this.gridData = this.overSpeed;
  }

}
