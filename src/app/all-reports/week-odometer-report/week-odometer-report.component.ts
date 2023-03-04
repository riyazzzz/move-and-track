import { Component, OnInit, ViewChild } from '@angular/core';
import { Chart } from 'chart.js';
import { AjaxService } from '../../services/ajax.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-week-odometer-report',
  templateUrl: './week-odometer-report.component.html',
  styleUrls: ['./week-odometer-report.component.scss'],
})
export class WeekOdometerReportComponent implements OnInit {


  bars: any;
  resultedOdmeterList: any = new Array();
  @ViewChild('barChart', { static: false }) barChart;
  constructor(
    public ajaxService: AjaxService,
    public modalController: ModalController
  ) { }
  closeModel() {
    this.modalController.dismiss();
  }
  getOdometerHistory() {
    this.resultedOdmeterList = JSON.parse(localStorage.getItem('reportsData'));
    var thisData = this;
    setTimeout( function (){
      thisData.odometerList();
    }, 500)
  }
  // }
  odometerList = () => {
    const xAxis = new Array();
    const yAxis = new Array();
    // tslint:disable-next-line: forin
    for (const x in this.resultedOdmeterList) {
      // tslint:disable-next-line: radix
      yAxis.push(parseInt(this.resultedOdmeterList[x].odometer));
      xAxis.push(this.resultedOdmeterList[x].date.split('-')[2]);
    }
    // test
    // yAxis = [10,130,150,490,980];
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'bar',
      data: {
        datasets: [{
          label: 'Odometer in kilometers',
          data: yAxis,
          backgroundColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderColor: 'rgb(38, 194, 129)', // array should have same number of elements as number of dataset
          borderWidth: 5
        }],
        labels: xAxis,
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true,
              stepSize: Math.round(Math.max(...yAxis) / 10)
            }
          }]
        }
      }
    });
  }
  ngOnInit() {
    this.getOdometerHistory();
  }
}
