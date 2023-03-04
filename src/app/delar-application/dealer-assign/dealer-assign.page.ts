import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-dealer-assign",
  templateUrl: "./dealer-assign.page.html",
  styleUrls: ["./dealer-assign.page.scss"],
})
export class DealerAssignPage implements OnInit {
  assignForm: FormGroup;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  tableData: any;
  page = [];
  selectedRow = [];
  button: boolean = true;

  constructor(
    public platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private ajaxService: AjaxService
  ) {}

  createForm() {
    this.assignForm = this.formBuilder.group({
      company: ["", Validators.required],
    });
  }

  clear() {
    this.assignForm.patchValue({
      company: "",
    });
    this.getdatas();
  }

  getdatas() {
    this.commonService.presentLoader();
    var url =
      serverUrl.web +
      "/global/getAssignVehicle?dealerid=" +
      localStorage.getItem("companySuffix");
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.commonService.dismissLoader();
      this.tableData = res;

      this.renderer = (row: number, column: any, value: string) => {
        if (value == "" || null || undefined) {
          return "---";
        } else {
          return (
            '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;padding:0px 5px">' +
            value +
            "</span>"
          );
        }
      };
      this.source = { localdata: this.tableData.vehicledetail };
      this.dataAdapter = new jqx.dataAdapter(this.source);
      this.myGrid.clearselection();
      this.columns = [
        {
          text: "Company Id",
          datafield: "companyId",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 300,
        },
        {
          text: "Plate No",
          datafield: "plateNo",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 300,
        },
        {
          text: "IMEI No",
          datafield: "imeiNo",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 300,
        },
        {
          text: "Status",
          datafield: "status",
          cellsrenderer: this.renderer,
          cellsalign: "center",
          align: "center",
          width: 270,
        },
      ];
    });
  }

  async saveModel() {
    const alert = await this.alertController.create({
      header: " Confirm",
      backdropDismiss: false,
      message: "Are you sure you want to assign?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {},
        },
        {
          text: "Ok",
          handler: (data) => {
            this.save();
          },
        },
      ],
    });
    await alert.present();
  }

  save() {
    let selectdata = this.myGrid.getselectedrowindexes();
    var arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push(this.myGrid["attrSource"]["originaldata"][selectdata[i]].vin);
    }
    const url =
      serverUrl.web +
      "/global/saveAssignVehicle?companyid=" +
      this.tableData.company;
    this.ajaxService.ajaxPostWithBody(url, arr).subscribe((res) => {
      if (res.message == "Vehicle Assigned Successfully") {
        this.commonService.showConfirm(res.message);
        this.myGrid.clearselection();
        this.getdatas();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  async removeModel() {
    const alert = await this.alertController.create({
      header: " Confirm",
      backdropDismiss: false,
      message: "Are you sure you want to remove?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {},
        },
        {
          text: "Ok",
          handler: (data) => {
            this.remove();
          },
        },
      ],
    });
    await alert.present();
  }

  remove() {
    let selectdata = this.myGrid.getselectedrowindexes();
    var arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push(this.myGrid["attrSource"]["originaldata"][selectdata[i]].vin);
    }
    const url =
      serverUrl.web +
      "/global/removeAssignedVehicle?companyid=" +
      this.tableData.company;
    this.ajaxService.ajaxDeleteWithBody(url, arr).subscribe((res) => {
      if (res.message == "Vehicle Removed Successfully") {
        this.commonService.showConfirm(res.message);
        this.myGrid.clearselection();
        this.getdatas();
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  myGridOnRowclick(event: any): void {
    this.selectedRow = event.args.row.bounddata;
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = this.myGrid.getselectedrowindexes();
    if (this.selectedRow.length > 0) {
      this.button = false;
    } else {
      this.button = true;
    }
    if (event.type == "rowunselect") return null;
  }

  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.createForm();
  }

  ngAfterViewInit() {
    this.myGrid.pagesizeoptions(["100", "200", "500", "1000"]);
  }

  ionViewWillEnter() {
    this.getdatas();
  }
}
