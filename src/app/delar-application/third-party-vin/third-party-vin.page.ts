import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { app, serverUrl } from "src/environments/environment";

@Component({
  selector: "app-third-party-vin",
  templateUrl: "./third-party-vin.page.html",
  styleUrls: ["./third-party-vin.page.scss"],
})
export class ThirdPartyVinPage implements OnInit {
  thirdpartyform: FormGroup;
  urlform: FormGroup;
  @Input() value;
  @ViewChild("selectComponent", { static: false })
  selectComponent: IonicSelectableComponent;
  @ViewChild("myGrid", { static: false }) myGrid: any;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform;
  appName: string;
  serverlist: any;
  apiurl: any;
  thirdpartyurl: any;
  selectedRow: any = [];
  tableData: any;
  show: boolean = false;
  showButton: boolean = true;
  page = [];

  constructor(
    private ajaxService: AjaxService,
    private platform: Platform,
    private modalController: ModalController,
    private alertController: AlertController,
    private commonService: CommonService,
    private formBuilder: FormBuilder
  ) {}

  clear() {
    this.thirdpartyform.patchValue({
      serverlist: "",
    });
    this.urlform.patchValue({
      thirdpartyurl: "",
      imeino: "",
    });
    this.show = false;
    this.getdata();
  }

  getlist() {
    const url = serverUrl.web + "/global/getThirdparty";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      console.log(res);
      this.serverlist = res;
    });
  }

  onSubmit() {
    const url =
      serverUrl.web +
      "/global/getThirdpartyVinsAndUrl?thirdpartyservers=" +
      this.thirdpartyform.value.serverlist;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      console.log(res);
      this.apiurl = res;
      this.show = true;
      this.urlform.patchValue({
        thirdpartyurl: this.apiurl.thirdpartyurl,
      });
      this.tableData = this.apiurl.thirdpartyvins;
      this.getdata();
    });
  }
  refresh() {
    const url =
      serverUrl.web +
      "/global/getThirdpartyVinsAndUrl?thirdpartyservers=" +
      this.selectedRow.thirdpartyserver;
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      console.log(res);
      this.apiurl = res;
      this.show = true;
      this.urlform.patchValue({
        thirdpartyurl: this.apiurl.thirdpartyurl,
      });
      this.tableData = this.apiurl.thirdpartyvins;
      this.getdata();
    });
  }

  add() {
    var data;
    data = {
      thirdpartyservers: this.thirdpartyform.value.serverlist,
      url: this.urlform.value.thirdpartyurl,
      imeino: this.urlform.value.imeino.toString(),
    };
    const url = serverUrl.web + "/global/saveThirdpartyVins";
    this.ajaxService
      .ajaxPostWithString(url, JSON.stringify(data))
      .subscribe((res) => {
        if (JSON.parse(res).message == "third party vin saved successfully") {
          this.commonService.presentToast("Third Party Vin saved successfully");
          this.onSubmit();
          this.modalController.dismiss();
        } else {
          this.commonService.showConfirm(JSON.parse(res).message);
        }
      });
  }

  async addModel() {
    const alert = await this.alertController.create({
      header: " Confirm",
      backdropDismiss: false,
      message: "Are you sure you want to save?",
      buttons: [
        {
          text: "Cancel",
          role: "cancel",
          handler: (data) => {},
        },
        {
          text: "Ok",
          handler: (data) => {
            this.add();
          },
        },
      ],
    });
    await alert.present();
  }

  delete() {
    let selectdata = this.myGrid.getselectedrowindexes();
    let arr = [];
    for (let i = 0; i < selectdata.length; i++) {
      arr.push({
        thirdpartyservers:
          this.myGrid["attrSource"]["originaldata"][selectdata[i]]
            .thirdpartyserver,
        vin: this.myGrid["attrSource"]["originaldata"][selectdata[i]].vin,
      });
    }
    const url = serverUrl.web + "/global/DeleteThirdpartyVins";
    this.ajaxService.ajaxPostWithString(url, arr).subscribe((response) => {
      let res = JSON.parse(response);
      if (res.message == "third party vins removed successfully") {
        this.commonService.showConfirm("Third Party Vins Removed Successfully");
        this.clear();

        // this.refresh();
        // this.myGrid.clearselection();
        // this.modalController.dismiss();
        // this.selectedRow = "";
      } else {
        this.commonService.showConfirm("Please Contact Support Team");
      }
    });
  }
  async deleteModel() {
    if (this.selectedRow) {
      const alert = await this.alertController.create({
        header: " Delete",
        backdropDismiss: false,
        message: "Are you sure you want to delete?",
        buttons: [
          {
            text: "Cancel",
            role: "cancel",
            handler: (data) => {},
          },
          {
            text: "Ok",
            handler: (data) => {
              this.delete();
            },
          },
        ],
      });
      await alert.present();
    } else {
      this.commonService.presentToast("Please select a row to Delete");
      return "";
    }
  }

  myGridOnRowSelect(event: any): void {
    this.selectedRow = this.myGrid.getselectedrowindexes();

    if (this.selectedRow.length > 0) {
      this.showButton = false;
    } else {
      this.showButton = true;
    }
  }

  getdata() {
    this.renderer = (row: number, column: any, value: string) => {
      if (value == "" || null || undefined || value == ",") {
        return "---";
      } else {
        return (
          '<span  style="line-height:32px;font-size:11px;color:darkblue;margin:auto;">' +
          value +
          "</span>"
        );
      }
    };

    this.source = { localdata: this.tableData };
    this.page = ["100", "200", "500", "1000"];
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      {
        text: "Imei Number",
        datafield: "imeino",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 190,
      },
      {
        text: "Vin",
        datafield: "vin",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 190,
      },
      {
        text: "Data Recieved",
        datafield: "Data Received",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 190,
      },
      {
        text: "Data Send",
        datafield: "Data Sent",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 190,
      },
      {
        text: "Third Party Server",
        datafield: "thirdpartyserver",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 200,
      },
      {
        text: "Delete Status",
        datafield: "deletestatus",
        cellsrenderer: this.renderer,
        cellsalign: "center",
        align: "center",
        width: 190,
      },
    ];
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    this.appName = app.appName;
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.thirdpartyform = this.formBuilder.group({
      serverlist: ["", Validators.required],
    });
    this.urlform = this.formBuilder.group({
      thirdpartyurl: ["", Validators.required],
      imeino: ["", Validators.required],
    });
    this.getlist();
    this.getdata();
  }

  ionViewWillEnter() {
    this.thirdpartyform.reset();
    this.urlform.reset();
    this.show = false;
  }
}
