import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-executive-summary-card",
  templateUrl: "./executive-summary-card.component.html",
  styleUrls: ["./executive-summary-card.component.scss"],
})
export class ExecutiveSummaryCardComponent {
  @Input() commonData: any;
  @Input() searchTerm: any;
  x;
  total: any = 0;
  constructor() {}
  ngOnChanges() {
    this.x = this.commonData;
    let arr: any = Object.values(this.x.alertCount);

    // Creating array

    // Creating variable to store the sum

    // Running the for loop
    for (let i = 0; i < arr.length; i++) {
      this.total += arr[i];
    }
  }
  // ngOnInit() {
  //   //console.log("hit"+this.commonData)
  //   this.x = this.commonData;
  //   let arr: any = Object.values(this.x.alertCount);

  //   // Creating array

  //   // Creating variable to store the sum

  //   // Running the for loop
  //   for (let i = 0; i < arr.length; i++) {
  //     this.total += arr[i];
  //   }
  // }
}
