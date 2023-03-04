import { Component, OnInit, ViewChild } from "@angular/core";
import { Platform } from "@ionic/angular";
import { OpenlayerMapService } from "src/app/services/openlayer-map.service";
import { AuthMapService } from "src/app/services/auth-map.service";
import { Chart } from "chart.js";
import { Location } from "@angular/common";
import { CommonService } from "../../services/common.service";
@Component({
  selector: "app-overall-summary",
  templateUrl: "./overall-summary.page.html",
  styleUrls: ["./overall-summary.page.scss"],
})
export class OverallSummaryPage implements OnInit {
  viewType = "mapView";
  bars;
  map;
  show = false;
  overAllSummeryReport;
  summary: Array<object> = new Array();
  statusColor;
  @ViewChild("mapElement", { static: false }) mapElement;
  @ViewChild("barChart", { static: false }) barChart;

  format: any = { odometer: "" };
  resultedSummaryList: Array<Object> = new Array();
  reportData: any;
  myPlatform: any;
  _showPdf = "allPlatforms";
  pdfHead = [
    "Plate No",
    "Begin",
    "Begin Location",
    "End Time",
    "End Location",
    "Max Speed",
    "Odometer",
    "Running",
    "Stop",
    "Towed",
  ];
  constructor(
    private mapService: AuthMapService,
    private location: Location,
    private commonService: CommonService,
    private platform: Platform
  ) {
    this.mapService = new OpenlayerMapService();
  }

  createPdf() {
    var obj = [];
    for (let i = 0; i < this.reportData.length; i++) {
      obj.push([
        this.reportData[i].plateNo,
        this.reportData[i].begin,
        this.reportData[i].beginLocation,
        this.reportData[i].end,
        this.reportData[i].endLocation,
        this.reportData[i].maxSpeed,
        this.reportData[i].odometer,
        this.reportData[i].runningDuration,
        this.reportData[i].stopDuration,
        this.reportData[i].towedDuration,
      ]);
    }
    this.commonService.createPdf(
      this.pdfHead,
      obj,
      "Over all summary",
      this.myPlatform,
      "Over all summary"
    );
  }

  getBack() {
    this.location.back();
  }

  mapAndGridView(selectedTab) {
    // this.viewType = selectedTab;

    // if (selectedTab === 'graphView') {
    const xAxis = new Array();
    const yAxis = new Array();
    // tslint:disable-next-line: forin
    for (const x in this.resultedSummaryList) {
      // tslint:disable-next-line: radix
      yAxis.push(
        this.commonService.timeConverter(
          this.resultedSummaryList[x]["duration"],
          "minutes"
        )
      );
      xAxis.push(this.resultedSummaryList[x]["status"]);
    }
    // test
    // yAxis = [10,130,150,490,980];
    this.bars = new Chart(this.barChart.nativeElement, {
      type: "doughnut",
      data: {
        datasets: [
          {
            label: "Status in days",
            data: yAxis,
            backgroundColor: ["#eb3636", "#36eb9d", "#36a2eb", "#eb368d"],
            borderColor: ["#f7f7f7", "#f7f7f7", "#f7f7f7", "#f7f7f7"], // array should have same number of elements as number of dataset
            borderWidth: 5,
          },
        ],
        labels: xAxis,
      },
      options: {
        // scales: {
        //   yAxes: [{
        //     ticks: {
        //       beginAtZero: true,
        //       stepSize: 0.1
        //     }
        //   }]
        // },
        tooltips: {
          //   label: function(tooltipItem, data) {
          //     var label = data.datasets[tooltipItem.datasetIndex].label || '';
          //     return label;
          // }
          callbacks: {
            label: function (tooltipItem, data) {
              //get the concerned dataset
              var dataset = data.datasets[tooltipItem.datasetIndex];
              //calculate the total of this data set
              var total = dataset.data.reduce(function (
                previousValue,
                currentValue,
                currentIndex,
                array
              ) {
                return previousValue + currentValue;
              });
              //get the current items value
              var currentValue = dataset.data[tooltipItem.index];
              //calculate the precentage based on the total and current item, also this does a rough rounding to give a whole number
              var percentage = Math.floor((currentValue / total) * 100 + 0.5);
              var labelIndex = tooltipItem.index;
              var realLabel = data.labels[labelIndex];
              return realLabel + " : " + percentage + "%";
            },
          },
        },
      },
    });
    //  }
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }

    // this.commonService.presentLoader();
    // setTimeout(() => {
    //   if (localStorage.map === 'GoogleMap') {
    //     this.map.updateSize();
    //     this.map = this.mapService.loadMap(this.mapElement.nativeElement, {lat: 78.33251953124999, lng: 17.748686651728804}, false, false);

    //   } else {
    //     this.map = this.mapService.loadMap(this.mapElement.nativeElement, {lat: 69.53451763078357, lng: 89.6484375}, false, false);
    //   }
    //this.mapService.setCenter(this.map, { lat: 17.786351, lng: 78.090820 });
    // }, 2000);
    this._showPdf = localStorage.getItem("device");
    this.format = JSON.parse(localStorage.reportsData);
    this.reportData = JSON.parse(localStorage.reportsData);
    if (JSON.stringify(this.reportData[0]) == "{}") {
      this.show = false;
      this.commonService.presentToast("No Data Available");
    } else {
      this.show = true;
      let addition = 0;
      let datas;
      for (datas of Object.values(this.reportData[0].alertCount)) {
        addition += datas;
      }
      this.reportData[0]["totalCount"] = addition;
      this.format = {
        summary: [
          { duration: this.reportData[0]["stopDuration"], status: "Stop" },
          {
            duration: this.reportData[0]["runningDuration"],
            status: "Running",
          },
          { duration: this.reportData[0]["idleDuration"], status: "Idle" },
          { duration: this.reportData[0]["towedDuration"], status: "Towed" },
        ],
        odometer: this.reportData[0]["odometer"],
      };
      this.resultedSummaryList = this.format["summary"];
      this.statusColor = JSON.parse(localStorage.appSettings).statusColor;

      for (let i of this.format["summary"]) {
        const obj: object = {};
        obj["type"] = i.status;
        obj["value"] = this.commonService.timeConverter(i.duration, "display");
        obj["borderStyle"] = i.status + "Style";
        obj["partitionStyle"] = i.status + "PartitionLine";
        this.summary.push(obj);
      }

      setTimeout(() => {
        this.mapAndGridView(null);
        this.commonService.dismissLoader();
      }, 2000);
    }
  }
}
