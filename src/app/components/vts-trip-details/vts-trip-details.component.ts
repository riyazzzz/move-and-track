import { Component, Input, OnInit } from "@angular/core";

@Component({
  selector: "app-vts-trip-details",
  templateUrl: "./vts-trip-details.component.html",
  styleUrls: ["./vts-trip-details.component.scss"],
})
export class VtsTripDetailsComponent implements OnInit {
  tripData: any;
  constructor() {}

  ngOnInit() {
    this.tripData = JSON.parse(localStorage.getItem("trip"));
  }
}
