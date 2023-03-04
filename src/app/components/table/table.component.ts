import {
  Component,
  ViewChild,
  OnChanges,
  Input,
  OnInit,
  ElementRef,
} from "@angular/core";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import "jspdf-autotable";
import { jsPDF } from "jspdf";
import { ExportExcelService } from "../../services/export-excel.service";
import { CommonService } from "src/app/services/common.service";
import { adminLocalStorage } from "src/environments/environment";
@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent implements OnInit {
  titles = "jspdf-autotable-demo";
  title = "angular-export-to-excel";
  @Input() reportTitle;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  dataForExcel = [];
  tableData: any;
  reportsData;
  objValues = [];
  odj = [];
  data: any;
  myPanel: any;
  columngroups: any = [];
  w: string;
  alert: any = [];
  constructor(
    private ete: ExportExcelService,
    private commonService: CommonService
  ) {}

  source: { localdata: any };
  dataAdapter: any;
  columns: {
    text: string;
    datafield: string;
    cellalign: string;
    align: string;
  }[];
  renderer: (row: number, column: any, value: string) => string;
  head = [];
  exportTitle = [];
  excelTitle = {};
  newTitle = [];
  column = [];
  reportKeys: any;

  // ngOnChanges() {
  //   // this.tableDetails();
  // }
  // ngAfterViewInit() {
  //   this.myGrid.showloadelement();
  //   // this.tableDetails();
  // }

  tableDetails() {
    this.renderer = (row: number, column: any, value: any) => {
      if (value == "" || null || undefined) {
        return "--";
      }
      if (value == 0) {
        return (
          '<div  style="vertical-align: middle;font-size:10px;padding:5px;">' +
          "0" +
          "</div>"
        );
      }
      if (value == { alertCount: "" }) {
        return "--";
      } else {
        return (
          '<div  style="vertical-align: middle;font-size:10px;padding:5px;">' +
          value +
          "</div>"
        );
      }
    };
    if (this.reportTitle == "movementReport") {
      this.tableData = JSON.parse(adminLocalStorage.reportData);
    } else {
      let arr = [];
      let data = JSON.parse(localStorage.getItem("reportsData"));
      data.map((d) => {
        const { alertCount, ...rest } = d;
        let value = Object.values(d.alertCount).toString();
        arr.push({ alertCount: value, ...rest });
      });
      this.tableData = arr;
    }

    if (this.reportTitle == "movementReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        { text: "Speed", datafield: "speed", cellsrenderer: this.renderer },
        { text: "Status", datafield: "status", cellsrenderer: this.renderer },
        {
          text: "Time Stamp",
          datafield: "timeStamp",
          cellsrenderer: this.renderer,
        },
        {
          text: "Operator",
          datafield: "operatorName",
          cellsrenderer: this.renderer,
          width: 100,
        },
        {
          text: "Address",
          datafield: "emailAddress",
          width: 300,
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "overallSummaryReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        { text: "Begin", datafield: "begin", cellsrenderer: this.renderer },
        {
          text: "Begin Location",
          datafield: "beginLocation",
          cellsrenderer: this.renderer,
        },
        { text: "End", datafield: "end", cellsrenderer: this.renderer },
        {
          text: "Alerts Count",
          datafield: "alertCount",
          cellsrenderer: this.renderer,
        },
        {
          text: "End Location",
          datafield: "endLocation",
          cellsrenderer: this.renderer,
        },
        {
          text: "Max Speed",
          datafield: "maxSpeed",
          cellsrenderer: this.renderer,
        },
        {
          text: "Odometer",
          datafield: "odometer",
          cellsrenderer: this.renderer,
        },
        {
          text: "Running",
          datafield: "runningDuration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Stop",
          datafield: "stopDuration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Idle",
          datafield: "idleDuration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Towed",
          datafield: "towedDuration",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "EngineHoursSummaryReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start time",
          datafield: "startTime",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start location",
          datafield: "startAddress",
          cellsrenderer: this.renderer,
        },
        {
          text: "End time",
          datafield: "endTime",
          cellsrenderer: this.renderer,
        },
        {
          text: "End location",
          datafield: "stopAddress",
          cellsrenderer: this.renderer,
        },
        {
          text: "Odometer",
          datafield: "odometer",
          cellsrenderer: this.renderer,
        },
        {
          text: "Running",
          datafield: "runningDuration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Idle",
          datafield: "idleDuration",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "tripSummaryReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start time",
          datafield: "startTime",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start location",
          datafield: "startAddress",
          cellsrenderer: this.renderer,
        },
        {
          text: "End time",
          datafield: "endTime",
          cellsrenderer: this.renderer,
        },
        {
          text: "End location",
          datafield: "stopAddress",
          cellsrenderer: this.renderer,
        },
        {
          text: "Odometer",
          datafield: "odometer",
          cellsrenderer: this.renderer,
        },
        {
          text: "Running",
          datafield: "runningDuration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Idle",
          datafield: "idleDuration",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "executiveSummaryReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        { text: "Begin", datafield: "begin", cellsrenderer: this.renderer },
        {
          text: "Begin Location",
          datafield: "beginLocation",
          cellsrenderer: this.renderer,
        },
        { text: "End", datafield: "end", cellsrenderer: this.renderer },
        {
          text: "End Location",
          datafield: "endLocation",
          cellsrenderer: this.renderer,
        },
        {
          text: "Alerts Count",
          datafield: "alertCount",
          cellsrenderer: this.renderer,
        },
        {
          text: "Max Speed",
          datafield: "maxSpeed",
          cellsrenderer: this.renderer,
        },
        {
          text: "Odometer",
          datafield: "odometer",
          cellsrenderer: this.renderer,
        },
        {
          text: "Running",
          datafield: "runningDuration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Stop",
          datafield: "stopDuration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Towed",
          datafield: "towedDuration",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "driverBehavior") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        {
          text: "Driver Name",
          datafield: "driverName",
          cellsrenderer: this.renderer,
        },
        {
          text: "Harsh Break",
          datafield: "HARSHBRAKING",
          cellsrenderer: function (row, column, value) {
            return (
              "<div style='margin:4% 20%'><span style='padding:0 20%;background:brown;color:white'>+" +
              value +
              "</span></div>"
            );
          },
        },
        { text: "Tilt", datafield: "TILT", cellsrenderer: this.renderer },
        {
          text: "Average Speed",
          datafield: "avgSpeed",
          cellsrenderer: function (row, column, value) {
            return (
              "<div style='margin:4% 20%'><span style='padding:0 20%;background:yellow;'>+" +
              value +
              "</span></div>"
            );
          },
        },
        {
          text: "Travelled Km",
          datafield: "distanceTravelled",
          cellsrenderer: this.renderer,
        },
        {
          text: "Engine On",
          datafield: "engineOnDuration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Excessive Idle",
          datafield: "excessiveIdling",
          cellsrenderer: this.renderer,
        },
        {
          text: "Over All Score",
          datafield: "overAllScore",
          cellsrenderer: function (row, column, value) {
            return (
              "<div style='margin:4% 20%'><span style='padding:0 20%;background:green;color:white;'>+" +
              value +
              "</span></div>"
            );
          },
        },
        {
          text: "Running ",
          datafield: "runningDuration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Top Speed",
          datafield: "topSpeed",
          cellsrenderer: function (row, column, value) {
            return (
              "<div style='margin:4% 20%'><span style='padding:0 20%;background:orange;color:white'>+" +
              value +
              "</span></div>"
            );
          },
        },
      ];
    } else if (this.reportTitle == "speedReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        { text: "Speed", datafield: "speed", cellsrenderer: this.renderer },
        { text: "Time", datafield: "timeStamp", cellsrenderer: this.renderer },
        { text: "Date", datafield: "dateStamp", cellsrenderer: this.renderer },
        {
          text: "Operator",
          datafield: "operator",
          cellsrenderer: this.renderer,
        },
        {
          text: "Limit Exceeds",
          datafield: "descripition",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "statusSummary") {
      this.column = [
        {
          text: "Plate No",
          datafield: "Plate No",
          cellsrenderer: this.renderer,
        },
        {
          text: "Odometer",
          datafield: "Odometer",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start Time",
          datafield: "Begin",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start Address",
          datafield: "Begin At",
          cellsrenderer: this.renderer,
        },
        { text: "End Time", datafield: "End", cellsrenderer: this.renderer },
        {
          text: "End Address",
          datafield: "End At",
          cellsrenderer: this.renderer,
        },
        { text: "Stop", datafield: "Stop", cellsrenderer: this.renderer },
        { text: "Towed", datafield: "Towed", cellsrenderer: this.renderer },
        { text: "Running", datafield: "Running", cellsrenderer: this.renderer },
        { text: "Idle", datafield: "Idle", cellsrenderer: this.renderer },
      ];
    } else if (this.reportTitle == "alertReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        {
          text: "Operator Name",
          datafield: "operatorName",
          cellsrenderer: this.renderer,
        },
        {
          text: "Alert Types",
          datafield: "alertTypes",
          cellsrenderer: this.renderer,
        },
        {
          text: "Date & Time",
          datafield: "timeStamp",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "overspeedReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        {
          text: "Over Speed Duration",
          datafield: "duration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start Time",
          datafield: "start",
          cellsrenderer: this.renderer,
        },
        { text: "End Time", datafield: "end", cellsrenderer: this.renderer },
        { text: "Min Speed", datafield: "min", cellsrenderer: this.renderer },
        { text: "Max Speed", datafield: "max", cellsrenderer: this.renderer },
        { text: "Avg Speed", datafield: "avg", cellsrenderer: this.renderer },
      ];
    } else if (this.reportTitle == "temprature") {
      // this.column = [
      //   { text: "Plate No", datafield: "plateNo",cellsrenderer:this.renderer },
      //   { text: "date", datafield: "date",cellsrenderer:this.renderer},
      //   { text: "max", datafield: "max",cellsrenderer:this.renderer },
      //   { text: "Min", datafield: "min",cellsrenderer:this.renderer },
      //   { text: "name", datafield: "name" ,cellsrenderer:this.renderer},
      //   { text: "value", datafield: "value",cellsrenderer:this.renderer }

      // ];

      this.column = [
        // { text: "Plate No", datafield: "PlateNo", cellsrenderer: this.renderer},
        {
          text: "Timestamp",
          datafield: "TimeStamp",
          cellsrenderer: this.renderer,
        },
      ];
      if (Object.keys(this.tableData[0]).includes("TEMPERATURESENSOR1")) {
        this.column.push({
          text:
            '<div style=" line-height: normal;">' +
            this.tableData[0].TEMPERATURESENSOR1.name +
            "<br /> (min:" +
            this.tableData[0].TEMPERATURESENSOR1.min +
            ", max: " +
            this.tableData[0].TEMPERATURESENSOR1.max +
            ")</div>",
          datafield: "TEMPERATURESENSOR1value",
          cellsrenderer: this.renderer,
          width: 120,
        });
      }
      if (Object.keys(this.tableData[0]).includes("TEMPERATURESENSOR2")) {
        this.column.push({
          text:
            '<div style=" line-height: normal;">' +
            this.tableData[0].TEMPERATURESENSOR2.name +
            "<br /> (min:" +
            this.tableData[0].TEMPERATURESENSOR2.min +
            ", max: " +
            this.tableData[0].TEMPERATURESENSOR2.max +
            ")</div>",
          datafield: "TEMPERATURESENSOR2value",
          cellsrenderer: this.renderer,
          width: 120,
        });
      }
      if (Object.keys(this.tableData[0]).includes("TEMPERATURESENSOR3")) {
        this.column.push({
          text:
            '<div style=" line-height: normal;">' +
            this.tableData[0].TEMPERATURESENSOR3.name +
            "<br /> (min:" +
            this.tableData[0].TEMPERATURESENSOR3.min +
            ", max: " +
            this.tableData[0].TEMPERATURESENSOR3.max +
            ")</div>",
          datafield: "TEMPERATURESENSOR2value",
          cellsrenderer: this.renderer,
          width: 120,
        });
      }
      if (Object.keys(this.tableData[0]).includes("TEMPERATURESENSOR3")) {
        this.column.push({
          text:
            '<div style=" line-height: normal;">' +
            this.tableData[0].TEMPERATURESENSOR4.name +
            "<br /> (min:" +
            this.tableData[0].TEMPERATURESENSOR4.min +
            ", max: " +
            this.tableData[0].TEMPERATURESENSOR4.max +
            ")</div>",
          datafield: "TEMPERATURESENSOR2value",
          cellsrenderer: this.renderer,
          width: 120,
        });
      }
      // for (var i = 0; i < Object.keys(this.data[0]).sort().length; i++) {
      //   if (Object.keys(this.data[0]).length == i) {
      //     break;
      //   }
      //   var res = Object.keys(this.data[0])[i].split(" ")
      //   if (res.length >= 2) {
      //     this.column.push({ text: '<div style=" line-height: normal;">' + res[0] + '<br />' + res[1] + '</div>', datafield: Object.keys(this.data[0])[i], cellsalign: 'center', align: 'center', cellsrenderer: this.renderer, width: 120 })
      //   } else {
      //     this.column.push({ text: Object.keys(this.data[0])[i], datafield: Object.keys(this.data[0])[i], cellsalign: 'center', align: 'center', cellsrenderer: this.renderer })

      //   }
      // }
    } else if (this.reportTitle == "doorOpenReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        {
          text: "Timestamp",
          datafield: "timeStamp",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "doorSummaryReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        {
          text: "Door Status",
          datafield: "DoorStatus",
          cellsrenderer: this.renderer,
        },
        {
          text: "Time Duration",
          datafield: "timeDuration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start Time",
          datafield: "startTimeStamp",
          cellsrenderer: this.renderer,
        },
        {
          text: "End Time",
          datafield: "endTimeStamp",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "doorCountReport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        {
          text: "Door Open Count",
          datafield: "count",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "alarmreport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        { text: "Status", datafield: "status", cellsrenderer: this.renderer },
        {
          text: "AlertType",
          datafield: "AlertType",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start Time",
          datafield: "startTime",
          cellsrenderer: this.renderer,
        },
        {
          text: "End Time",
          datafield: "endTime",
          cellsrenderer: this.renderer,
        },
        {
          text: "Time Duration",
          datafield: "duration",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "fuelreport") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
        },
        {
          text: "Consumer price",
          datafield: "consumePrice",
          cellsrenderer: this.renderer,
        },
        {
          text: "Odometer",
          datafield: "odometer",
          cellsrenderer: this.renderer,
        },
        { text: "Date", datafield: "date", cellsrenderer: this.renderer },
        {
          text: "Begin Location",
          datafield: "endLocation",
          cellsrenderer: this.renderer,
        },
        {
          text: "End Location",
          datafield: "beginLocation",
          cellsrenderer: this.renderer,
        },
        { text: "Price", datafield: "price", cellsrenderer: this.renderer },
        {
          text: "Consumer quantity",
          datafield: "consumeQuantity",
          cellsrenderer: this.renderer,
        },
        { text: "Mileage", datafield: "mileage", cellsrenderer: this.renderer },
        {
          text: "Fuel type",
          datafield: "fuelType",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "primitiveMaintanance") {
      this.column = [
        {
          text: "Plate No",
          datafield: "plateno",
          cellsrenderer: this.renderer,
        },
        {
          text: "Odometer",
          datafield: "currentOdometer",
          cellsrenderer: this.renderer,
        },
        {
          text: "Last maintanance",
          datafield: "lastmaintenance",
          cellsrenderer: this.renderer,
        },
        {
          text: "Last maintenance time",
          datafield: "lastmaintenancetime",
          cellsrenderer: this.renderer,
        },
        {
          text: "Due kilometer",
          datafield: "duekilometer",
          cellsrenderer: this.renderer,
        },
        { text: "Status", datafield: "status", cellsrenderer: this.renderer },
      ];
    } else if (this.reportTitle == "Attendance report") {
      this.column = [
        { text: "Roll No", datafield: "rollno", cellsrenderer: this.renderer },
        { text: "First Name", datafield: "name", cellsrenderer: this.renderer },
        { text: "Class", datafield: "class", cellsrenderer: this.renderer },
        { text: "Section", datafield: "section", cellsrenderer: this.renderer },
        // { text: "Due kilometer", datafield: "duekilometer", cellsrenderer: this.renderer },
        { text: "Status", datafield: "status", cellsrenderer: this.renderer },
      ];
    } else if (this.reportTitle == "fmstripReport") {
      this.column = [
        {
          text: "Vehicle Number",
          datafield: "vin",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start Location",
          datafield: "startlocation",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start Date",
          datafield: "startdate",
          cellsrenderer: this.renderer,
        },
        {
          text: "Start Time",
          datafield: "starttime",
          cellsrenderer: this.renderer,
        },
        {
          text: "End Location",
          datafield: "endlocation",
          cellsrenderer: this.renderer,
        },
        {
          text: "End Date",
          datafield: "enddate",
          cellsrenderer: this.renderer,
        },
        {
          text: "End Time",
          datafield: "endtime",
          cellsrenderer: this.renderer,
        },
        {
          text: "Total Duration",
          datafield: "duration",
          cellsrenderer: this.renderer,
        },
        {
          text: "Total Distance",
          datafield: "distance",
          cellsrenderer: this.renderer,
        },
      ];
    } else if (this.reportTitle == "Student Alert Report") {
      let headers = JSON.parse(localStorage.getItem("reportsHeaders"));
      headers.forEach((element) => {
        this.column.push({
          text: element,
          datafield: element,
          cellsrenderer: this.renderer,
        });
      });
      // headers.forEach()
      // var datafeild = [{ "studentName": "gokul", "contactNo": "9962139969", "MATA": true, "MBES": true, "EATA": true, "EBLS": true }]
      // var attendance_datas = [{ "Morning Alerts": ["About to Arrive", "Bus Entered School", "gone"] },
      // { "Evening Alerts": ["About To Arrive", "Bus Left School", "went"] }]

      // const dat =[[{"studentName":"gokul","contactNo":"9962139969","AbouttoArrive":"sent","AboutToArrive":"sent","BusEnteredSchool":"sent",
      // "BusLeftSchool":"sent",
      // },{"studentName":"raj","contactNo":"996239969","AbouttoArrive":"sent","AboutToArrive": "notsent","BusEnteredSchool":"notsent",
      // "BusLeftSchool":"sent",
      // }], [{"Morning Alerts":["About to Arrive","Bus Entered School","gone"]},
      // {"Evening Alerts":["About To Arrive","Bus Left School","went"]}]]

      // for (var i = 0; i < Object.keys(attendance_datas).length; i++) {
      //   if (Object.keys(attendance_datas).length == i) {
      //     break;
      //   }
      //   this.columngroups.push(
      //     { text: Object.keys(attendance_datas[i]).toString(), align: 'center', name: Object.keys(attendance_datas[i]).toString() }
      //   )

      //   for (var j = 0; j < Object.values(attendance_datas[i])[0].length; j++) {
      //     this.column.push(
      //       { text: Object.values(attendance_datas[i])[0][j], columngroup: Object.keys(attendance_datas[i]).toString(), datafield: Object.values(attendance_datas[i])[0][j].replace(/\s+/g, ''), cellalign: "center", align: "center", cellsrenderer: this.renderer },
      //     )
      //   }

      // }
      this.column.push({
        text: "Contact No",
        datafield: "contactNo",
        cellalign: "center",
        align: "center",
        cellsrenderer: this.renderer,
      });
    } else if (this.reportTitle == "attendancereport") {
      this.column = [
        { text: "Roll No", datafield: "rollNo", cellsrenderer: this.renderer },
        {
          text: "First Name",
          datafield: "firstName",
          cellsrenderer: this.renderer,
        },
        { text: "Class", datafield: "classId", cellsrenderer: this.renderer },
        {
          text: "Section",
          datafield: "sectionId",
          cellsrenderer: this.renderer,
        },
        { text: "Status", datafield: "mode", cellsrenderer: this.renderer },
      ];
    } else if (this.reportTitle == "studentreport") {
      let headers = JSON.parse(localStorage.getItem("reportsHeaders"));
      headers.forEach((element) => {
        this.column.push({
          text: element,
          datafield: element,
          cellsrenderer: this.renderer,
        });
      });
      this.tableData = JSON.parse(localStorage.getItem("reportsData")).data;
      console.log(this.tableData);
      //   this.column.push(
      //     { text: 'Student Name', datafield: "StudentName", cellalign: "center", align: "center", cellsrenderer: this.renderer },
      //     { text: 'Contact No', datafield: "Contactno", cellalign: "center", align: "center", cellsrenderer: this.renderer });

      //   const studentsData =
      //     [
      //       {
      //         "StudentName": "Mohamed Jailani", "Contactno": "9962139969", "Alerts": [{
      //           "ABS(M)": "sent"
      //         }, {
      //           "SPFST(E)": "sent"
      //         }, {
      //           "BATAT(M)": "notsent"
      //         }, {
      //           "ABS(Y)": "sent"
      //         }, {
      //           "ABS(I)": "sent"
      //         }, {
      //           "ABS(E)": "sent"
      //         }
      //         ]
      //       }
      //         ,
      //       {
      //         "StudentName": "Mohamed Jailani", "Contactno": "9962139969", "Alerts": [{
      //           type: "ABS(M)", status: "sent"
      //         }, {
      //           type: "ABS(R)", status: "sent"
      //         }, {
      //           type: "ABS(T)", status: "sent"
      //         }, {
      //           type: "ABS(Y)", status: "sent"
      //         }, {
      //           type: "ABS(U)", status: "sent"
      //         }, {
      //           type: "ABS(I)", status: "sent"
      //         }, {
      //           type: "ABS(O)", status: "notsent"
      //         }, {
      //           type: "ABS(E)", status: "sent"
      //         }
      //         ]
      //       },
      //       {
      //         "StudentName": "Mohamed Jailani", "Contactno": "9962139969", "Alerts": [{
      //           type: "ABS(M)", status: "sent"
      //         }, {
      //           type: "ABS(R)", status: "sent"
      //         }, {
      //           type: "ABS(T)", status: "sent"
      //         }, {
      //           type: "ABS(Y)", status: "sent"
      //         }, {
      //           type: "ABS(U)", status: "sent"
      //         }, {
      //           type: "ABS(I)", status: "sent"
      //         }, {
      //           type: "ABS(O)", status: "sent"
      //         }, {
      //           type: "ABS(E)", status: "sent"
      //         }
      //         ]
      //       },
      //       {
      //         "StudentName": "Mohamed Jailani", "Contactno": "9962139969", "Alerts": [{
      //           type: "ABS(M)", status: "sent"
      //         }, {
      //           type: "ABS(R)", status: "sent"
      //         }, {
      //           type: "ABS(T)", status: "sent"
      //         }, {
      //           type: "ABS(Y)", status: "sent"
      //         }, {
      //           type: "ABS(U)", status: "sent"
      //         }, {
      //           type: "ABS(I)", status: "sent"
      //         }, {
      //           type: "ABS(O)", status: "sent"
      //         }, {
      //           type: "ABS(E)", status: "sent"
      //         }
      //         ]
      //       }
      //     ]

      //   //need to commit this line

      //  var data=[]
      //  var test={};
      //  this.w = ''
      //  var b={}
      //   for(var i=0;i<studentsData.length;i++){
      //     for(var j=0;j<studentsData[i].Alerts.length;j++){
      //     this.w =studentsData[i].Alerts[j]["type"]
      //    var a =studentsData[i].Alerts[j]["status"]
      //     b[this.w]=a;
      //     test = Object.assign(test,b)
      //     }

      //     data.push(Object.assign(test,{StudentName:studentsData[i].StudentName,Contactno:studentsData[i].Contactno}))
      //     }
      //     console.log(data)
      //   this.tableData = data;

      //   for (var i = 0; i < studentsData[0].Alerts.length; i++) {

      //     if (studentsData[0].Alerts.length == i) {
      //       break;
      //     }
      //     this.column.push({ text: Object.keys(studentsData[0].Alerts[i]).toString(), datafield: Object.keys(studentsData[0].Alerts[i]).toString(), cellalign: "center", align: "center", cellsrenderer: this.renderer })

      //   }
      //   console.log(this.column)
    }

    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = this.column;
    if (this.myGrid) this.myGrid.updatebounddata();
  }

  myGridOnSort(event: any): void {
    this.myPanel.clearcontent();
    let sortinformation = event.args.sortinformation;
    let sortdirection = sortinformation.sortdirection.ascending
      ? "ascending"
      : "descending";
    if (
      !sortinformation.sortdirection.ascending &&
      !sortinformation.sortdirection.descending
    ) {
      sortdirection = "null";
    }
    let eventData =
      'Triggered "sort" event <div>Column:' +
      sortinformation.sortcolumn +
      ", Direction: " +
      sortdirection +
      "</div>";
    this.myPanel.prepend(
      '<div style="margin-top: 5px;">' + eventData + "</div>"
    );
  }

  ngOnInit() {
    this.tableDetails();
  }
}
