import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-status',
  templateUrl: './grid-status.component.html',
  styleUrls: ['./grid-status.component.scss'],
})
export class GridStatusComponent implements OnInit {
  @Input() statusReportData;
  reportName = 'StatusSummary';
  
  constructor() { }
  
  ngOnInit() {}
  
}
