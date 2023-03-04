import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { ExportExcelService } from "src/app/services/export-excel.service";
import { serverUrl } from "src/environments/environment";
import { CommentComponent } from "./comment/comment.component";

@Component({
  selector: "app-device-activation-history",
  templateUrl: "./device-activation-history.page.html",
  styleUrls: ["./device-activation-history.page.scss"],
})
export class DeviceActivationHistoryPage implements OnInit {
  historyForm: FormGroup;
  @ViewChild("selectComponent", { static: false })
  selectComponent: IonicSelectableComponent;
  dealerlist: any;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  tableData: any;
  page = [];
  show: boolean = false;
  myPlatform: string;
  selectedRow: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService,
    private ete: ExportExcelService
  ) {}

  createForm() {
    this.historyForm = this.formBuilder.group({
      imeino: ["", Validators.required],
    });
  }

  clear() {
    this.historyForm.patchValue({
      imeino: "",
    });
    this.show = false;
  }

  SearchData() {
    this.show = true;
    this.page = [];
    this.commonService.presentLoader();
    var url =
      serverUrl.web +
      "/esim/getEsimActivationDetails?imei=" +
      this.historyForm.value.imeino;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      if (res.length == 0) {
        this.show = false;
        this.commonService.dismissLoader();
        this.commonService.showConfirm("Invalid IMEI Number");
      } else {
        this.page = ["100", "200", "500", "1000"];
        this.tableData = res;
        this.commonService.dismissLoader();
        console.log(this.myGrid);
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
        this.dataAdapter = new jqx.dataAdapter(this.source);
        this.columns = [
          {
            text: "Request No",
            datafield: "requestid",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 90,
            editable: true,
          },
          {
            text: "Request Date",
            datafield: "requestdate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 100,
            editable: true,
          },
          {
            text: "Request Dealer",
            datafield: "requesteddealer",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 120,
            editable: true,
          },
          {
            text: "Invoice No",
            datafield: "invoiceno",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 110,
            editable: true,
          },
          {
            text: "VLTD No",
            datafield: "vltdsno",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 130,
            editable: true,
          },
          {
            text: "ICCID No 1",
            datafield: "iccidno1",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 140,
            editable: true,
          },
          {
            text: "ICCID No 2",
            datafield: "iccidno2",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 140,
            editable: true,
          },
          {
            text: "IMEI No",
            datafield: "imei",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 120,
            editable: true,
          },
          {
            text: "SIM 1",
            datafield: "sim1",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 105,
            editable: true,
          },
          {
            text: "SIM 2",
            datafield: "sim2",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 105,
            editable: true,
          },
          {
            text: "Card Activated Date",
            datafield: "commercialactivationdate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
            editable: true,
          },
          {
            text: "Card End Date",
            datafield: "cardenddate",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 100,
            editable: true,
          },
          {
            text: "Card Status",
            datafield: "cardstatus",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 100,
            editable: true,
          },
          {
            text: "Comment",
            datafield: "latestcomment",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 120,
            editable: true,
          },
          {
            text: "Validity Requested",
            datafield: "validityperiod",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 150,
            editable: true,
          },
          {
            text: "Created by",
            datafield: "createdby",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 100,
            editable: true,
          },
          {
            text: "",
            datafield: "comment",
            columntype: "button",
            cellsalign: "center",
            align: "center",
            width: 120,
            cellsrenderer: (): string => {
              return this.myPlatform == "desktop"
                ? "Comments"
                : "<button>Comments</button>";
            },
            buttonclick: (row): void => {
              this.CommentModel(row);
            },
          },
        ];
      }
    });
  }

  async CommentModel(row) {
    const isModalOpened = await this.modalController.getTop();
    const modal = await this.modalController.create({
      component: CommentComponent,
      cssClass: "simupdateform",
      componentProps: {
        value: this.selectedRow,
      },
    });
    modal.onDidDismiss().then(() => {});
    return await modal.present();
  }

  myGridOnRowclick(event: any): void {
    this.selectedRow = event.args.row.bounddata;
  }

  newfunc() {
    let data = this.tableData;
    console.log(this.myGrid);

    let coloumnArray = [];

    this.myGrid.attrColumns.map((p) => {
      coloumnArray.push(p.datafield);
    });

    for (let i = 0; i < data.length; i++) {
      let k = Object.keys(data[i]);
      for (let j = 0; j < k.length; j++) {
        if (coloumnArray.includes(k[j]) == false) {
          delete data[i][k[j].toString()];
        }
      }
    }

    let forExcel = [];
    data.map((val) => {
      let newArray = Object.values(val);
      forExcel.push(newArray);
    });

    var Header = Object.keys(data[0]);

    let reportData = {
      title: "Device Activation Hitory",
      data: forExcel,
      headers: Header,
    };
    this.ete.exportExcel(reportData);
  }

  ngOnInit() {
    this.createForm();
  }

  ionViewWillEnter() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.clear();
  }
}
