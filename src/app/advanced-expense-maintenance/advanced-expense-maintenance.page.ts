import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-advanced-expense-maintenance',
  templateUrl: './advanced-expense-maintenance.page.html',
  styleUrls: ['./advanced-expense-maintenance.page.scss'],
})
export class AdvancedExpenseMaintenancePage implements OnInit {
  resData: { name: string; value: string; }[];

  constructor() { }

  ngOnInit() {
   this.resData = [{
      name:'test',
      value: ''
    },{
      name:'test',
      value: ''
    },{
      name:'test',
      value: ''
    }]
  }

}
