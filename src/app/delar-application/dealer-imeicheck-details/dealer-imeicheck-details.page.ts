import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { IonicSelectableComponent } from "ionic-selectable";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-dealer-imeicheck-details",
  templateUrl: "./dealer-imeicheck-details.page.html",
  styleUrls: ["./dealer-imeicheck-details.page.scss"],
})
export class DealerImeicheckDetailsPage implements OnInit {
  imeicheckForm: FormGroup;
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

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  createForm() {
    this.imeicheckForm = this.formBuilder.group({
      dealer: ["", Validators.required],
    });
  }

  clear() {
    this.imeicheckForm.patchValue({
      dealer: "",
    });
    this.show = false;
  }

  getdealer() {
    var url = serverUrl.web + "/global/getesimdealerlist";
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      this.dealerlist = res;
    });
  }

  SearchData() {
    this.show = true;
    this.page = [];
    this.commonService.presentLoader();
    var url =
      serverUrl.web +
      "/global/getimeinolist?dealername=" +
      this.imeicheckForm.value.dealer;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      if (res.length == 0) {
        this.show = false;
        this.commonService.dismissLoader();
        this.commonService.showConfirm("No record found");
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
            text: "IMEI No",
            datafield: "imeiNo",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 200,
            editable: true,
          },
          {
            text: "SIM No",
            datafield: "simcardNo",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 200,
            editable: true,
          },
          {
            text: "Manufacturer",
            datafield: "deviceManufacturer",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 200,
            editable: true,
          },
          {
            text: "Device Model",
            datafield: "deviceModel",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 200,
            editable: true,
          },
          {
            text: "Current Agency",
            datafield: "currentAgency",
            cellsrenderer: this.renderer,
            cellsalign: "center",
            align: "center",
            width: 200,
            editable: true,
          },
        ];
      }
    });
  }

  ngOnInit() {
    this.createForm();
  }
  ionViewWillEnter() {
    this.getdealer();
    this.clear();
  }
}
