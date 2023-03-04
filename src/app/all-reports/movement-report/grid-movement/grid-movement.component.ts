import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-grid-movement',
  templateUrl: './grid-movement.component.html',
  styleUrls: ['./grid-movement.component.scss'],
})
export class GridMovementComponent implements OnInit {
@Input() commonData;
@Input() displayCount: number = 30;
displayData: Array<any>;
currentPage: number = 1;
report = "movementReport"

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
      //console.log("DISPLAY DATA----------------------\n", this.displayData)
    }, 500);
  }

  setDisplayData() {
    if (this.commonData.length > this.displayCount) {
      this.displayData = this.commonData.slice(0, this.displayCount);
    }
    else {
      this.displayData = this.commonData;
    }
  }
 
  ngOnInit() {
    // this.commonData = this.movementReport
    this.setDisplayData();
  }
 
}
