import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-temprature-card',
  templateUrl: './temprature-card.component.html',
  styleUrls: ['./temprature-card.component.scss'],
})
export class TempratureCardComponent implements OnChanges {
  @Input() commonData;
  @Input() displayCount: number = 30;
  displayData: Array<any>;
  currentPage: number = 1;
  count = 10;
  iconColor = "gray";

  constructor() { }

  doInfinite(event) {
    //console.log("event trigger")
    setTimeout(() => {
      //console.log(this.commonData)
      this.displayData.push(...this.commonData.slice(this.currentPage * this.displayCount, (this.currentPage + 1) * this.displayCount));
      this.currentPage++;
      event.target.complete();
      if (this.displayData.length == this.commonData.length) {
        event.target.disabled = true;
      }
      // //console.log("DISPLAY DATA----------------------\n", this.displayData)
    }, 500);
   
  }

  setDisplayData() {
    if (this.commonData.length > this.displayCount) {
      this.displayData = this.commonData.slice(0, this.displayCount);
      //console.log();
    }
    else {
      this.displayData = this.commonData;
    }
  }
  ngOnInit() {
    this.commonData = JSON.parse(localStorage.getItem('reportsData'));
    this.setDisplayData();
    //  this.commonData = JSON.parse('[{"date":"2020-09-15 14:48:42.0","min":20,"plateNo":"CDAC_Test_1","max":40,"name":"zone1","value":"29.1"},{"date":"2020-09-15 12:48:42.0","min":20,"plateNo":"CDAC_Test_1","max":40,"name":"zone2","value":"28.6"}]')
  }
  ngOnChanges() {
    this.commonData = JSON.parse(localStorage.getItem('reportsData'));
    this.setDisplayData();
  }

}
