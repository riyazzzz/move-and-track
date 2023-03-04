import { Component, OnInit } from "@angular/core";
import { CommonService } from "src/app/services/common.service";
import { Location } from "@angular/common";
import { Platform } from "@ionic/angular";
@Component({
  selector: "app-executive-summary",
  templateUrl: "./executive-summary.component.html",
  styleUrls: ["./executive-summary.component.scss"],
})
export class ExecutiveSummaryComponent implements OnInit {
  view: string = "grid";
  tableValues = {};
  gridValues = [];
  myPlatform: any;
  _showPdf = "allPlatforms";
  commonData: any;
  pdfHead: any = [
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
    private commonService: CommonService,
    private location: Location,
    private platform: Platform
  ) {}
  typeOfView(viewType: string) {
    this.view = viewType;
  }
  createPdf() {
    var obj = [];
    for (let i = 0; i < this.commonData.length; i++) {
      obj.push([
        this.commonData[i].plateNo,
        this.commonData[i].begin,
        this.commonData[i].beginLocation,
        this.commonData[i].end,
        this.commonData[i].endLocation,
        this.commonData[i].maxSpeed,
        this.commonData[i].odometer,
        this.commonData[i].runningDuration,
        this.commonData[i].stopDuration,
        this.commonData[i].towedDuration,
      ]);
    }
    this.commonService.createPdf(
      this.pdfHead,
      obj,
      "Excutive summary report",
      this.myPlatform,
      "Door summary report"
    );
  }
  getBack() {
    this.location.back();
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.commonService.presentLoader();
    let locData = [];
    let veh = [];
    veh = JSON.parse(localStorage.getItem("reportsData"));
    this._showPdf = localStorage.getItem("device");
    this.commonData = JSON.parse(localStorage.getItem("reportsData"));
    // let veh = [
    //   {
    //     "plateNo": "Tn18a7353",
    //     "operatorName": "aaaaa",
    //     "groupName": "",
    //     "stopDuration": "5:23:59:59",
    //     "runningDuration": "5:23:59:59",
    //     "idleDuration": "5:23:59:59",
    //     "towedDuration": "5:23:59:59",
    //     "maxSpeed": "100",
    //     "odometer": "99999",
    //     "begin": "2020-02-03 00:00:00",
    //     "beginLocation": "13.st.chennai",
    //     "end": "2020-02-03 00:00:00",
    //     "endLocation": "14.st.chennai",
    //     "alertCount": {
    //       "ES": "45",
    //       "ST": "78",
    //       "PC": "10",
    //     }
    //   },
    //   {
    //     "plateNo": "Tn18a7353",
    //     "operatorName": "aaaaa",
    //     "groupName": "",
    //     "stopDuration": "5:23:59:59",
    //     "runningDuration": "5:23:59:59",
    //     "idleDuration": "5:23:59:59",
    //     "towedDuration": "5:23:59:59",
    //     "maxSpeed": "100",
    //     "odometer": "99999",
    //     "begin": "2020-02-03 00:00:00",
    //     "beginLocation": "13.st.chennai",
    //     "end": "2020-02-03 00:00:00",
    //     "endLocation": "14.st.chennai",
    //     "alertCount": {
    //       "ES": "45",
    //       "ST": "78",
    //       "PC": "10"
    //     }
    //   }
    // ];
    for (let i = 0; i < veh.length; i++) {
      let addition = 0,
        datas;
      for (datas of Object.values(veh[i].alertCount)) {
        addition += parseInt(datas);
      }
      veh[i]["totalCount"] = addition;
    }

    this.gridValues = veh;
    for (let i = 0; i < veh.length; i++) {
      locData[i] = {};
      locData[i]["plateOperGroup"] = JSON.stringify({
        plateNo: veh[i].plateNo.toUpperCase(),
        operator: veh[i].operatorName,
        group: veh[i].groupName,
      });
      locData[i]["runningDuration"] = veh[i].runningDuration;
      locData[i]["stopDuration"] = veh[i].stopDuration;
      locData[i]["idleDuration"] = veh[i].idleDuration;
      locData[i]["towedDuration"] = veh[i].towedDuration;
      locData[i]["maxSpeed"] = veh[i].maxSpeed;
      locData[i]["odometer"] = veh[i].odometer;
      locData[i]["alertCount"] = JSON.stringify(veh[i].alertCount);
      locData[i]["beginTime"] = veh[i].begin;
      locData[i]["beginLocation"] = veh[i].beginLocation;
      locData[i]["endTime"] = veh[i].end;
      locData[i]["endLocation"] = veh[i].endLocation;
    }
    this.tableValues = {
      localData: locData,
    };
    this.commonService.dismissLoader();
  }
}
