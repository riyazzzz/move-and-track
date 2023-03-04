import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-view',
  templateUrl: './grid-view.component.html',
  styleUrls: ['./grid-view.component.scss'],
})
export class GridViewComponent implements OnInit {
  @Input() gridData;
  @Input() reportSearch;
  constructor() { }

  ngOnInit() {}
  // ngOnChanges(changes): void {
  //   this.gridData = changes.gridData.currentValue;
  // }
}
