import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incomeandexpense-report',
  templateUrl: './incomeandexpense-report.component.html',
  styleUrls: ['./incomeandexpense-report.component.scss'],
})
export class IncomeandexpenseReportComponent implements OnInit {
  expensedetails: any;

  constructor() { }

  ngOnInit() {
    this.expensedetails = JSON.parse(localStorage.getItem('reportsData'));
  }


}
