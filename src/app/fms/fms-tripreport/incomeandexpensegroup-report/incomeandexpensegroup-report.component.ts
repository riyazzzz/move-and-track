import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-incomeandexpensegroup-report',
  templateUrl: './incomeandexpensegroup-report.component.html',
  styleUrls: ['./incomeandexpensegroup-report.component.scss'],
})
export class IncomeandexpensegroupReportComponent implements OnInit {
  incomeandexpense:any;
  incomeandexpensedetails: string[];
  totalcost: string[];
  profit=[];
  profitdata: any;
  profitlist: string[];
  profitvalue: string[];
  
  constructor() { }

  ngOnInit() {
    this.incomeandexpense = JSON.parse(localStorage.getItem('reportsData'));
    this.profitdata= this.incomeandexpense[2];
    this.profitlist =Object.keys(this.profitdata)
    this.profitvalue =Object.values(this.profitdata)
    this.profit.push(this.profitlist,this.profitvalue)
    this.incomeandexpensedetails = Object.keys(this.incomeandexpense[0]);
    this.totalcost = Object.keys(this.incomeandexpense[1])


        }
  getAddFunctionj(sum){
    var dat = 0;
    sum.map(s=> dat= dat+parseInt(s[2]))
    return dat;
   }
    
    
}
