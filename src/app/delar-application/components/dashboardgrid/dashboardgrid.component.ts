import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from "@angular/core";
import { TableComponent, TableColumn } from "smart-webcomponents-angular/table";
import { AjaxService } from "src/app/services/ajax.service";
import { MenuComponent, MenuItem } from "smart-webcomponents-angular/menu";
import { LoadingController, ModalController } from "@ionic/angular";
import { serverUrl } from "src/environments/environment";
@Component({
  selector: "app-dashboardgrid",
  templateUrl: "./dashboardgrid.component.html",
  styleUrls: ["./dashboardgrid.component.scss"],
})
export class DashboardgridComponent implements OnInit, OnChanges {
  @Input() grid;
  @Input() dealer: String;
  @Input() value;
  endis: boolean = false;
  data: any = [];
  columns = [];
  rowToRemove: any;
  filtering: Boolean = true;

  filterRow: Boolean = true;

  constructor(
    private ajaxService: AjaxService,
    private loadingCtrl: LoadingController,
    private modalController: ModalController
  ) {}
  // pageSize: any = '20'
  freezeHeader: Boolean = true;
  variable: Number = 1;
  @ViewChild("table", { read: TableComponent, static: false })
  table!: TableComponent;
  @ViewChild("menu2", { read: MenuComponent, static: false })
  menu2!: MenuComponent;
  paging = true;

  dataSource = new window.Smart.DataAdapter({
    dataSource: this.data,
  });

  async openModel(row?) {
    const modal = await this.modalController.create({
      component: DashboardgridComponent,
      cssClass: "dashboardgrid",
      componentProps: {
        value: this.rowToRemove.data.comment,
      },
    });
    modal.onDidDismiss().then((data) => {
      if (data.data.data == "Extend One Year Status Updated Successfully") {
        // this.getdatas();
      }
    });
    return await modal.present();
  }

  handleReady(event: Event) {}

  async showLoading() {
    const loading = await this.loadingCtrl.create({
      message: "Please wait...",
      duration: 8000,
    });

    loading.present();
  }

  ngAfterViewInit(): void {
    // afterViewInit code.
    this.init();
  }

  handleTableClick(event: Event) {
    const removeButton = (event.target as HTMLElement).closest(
        ".remove-button"
      ),
      table = this.table,
      removeMenu = this.menu2;

    if (removeButton) {
      const rect = removeButton.getBoundingClientRect();

      this.rowToRemove =
        table.nativeElement.rowById[removeButton.getAttribute("row-id")];

      this.openModel();
    }
  }

  enablebanner(d) {
    console.log(d);
    if (d == 0) {
      this.endis = true;
    } else {
      this.endis = false;
    }
  }

  init(): void {
    const that = this;
    var table = that.table;
    table.addEventListener("click", that.handleTableClick.bind(that));
  }

  pendingCADashboard() {
    this.showLoading();
    this.columns = [
      {
        label: "IMEI No",
        dataField: "imei",
        dataType: "number",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "ICCID No",
        dataField: "iccidno1",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "CA Requested Date",
        dataField: "carequestdate",
        dataType: "number",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "Slot No",
        dataField: "slotno",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "Box Number",
        dataField: "serialno",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "Comments",
        dataField: "purcomment",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "",
        dataField: "comment",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<smart-button   row-id="${settings.row}" class="remove-button">Comments</smart-button>`;
        },
      },
    ];

    let url =
      serverUrl.web +
      "/esim/getDealerCAStatusPending?companyid=apm&invoiceno=&serialno=&dealer=" +
      this.dealer;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.enablebanner(res.length);
      this.loadingCtrl.dismiss();
      this.data = [
        {
          renewalrequestid: "RE-00110",
          vltdsno: "APM1K2I102100007320",
          invoiceno: "",
          iccidno1: "8991102105467081515F",
          iccidno2: "8991102105467081515F",
          imei: "865006044572114",
          sim1: "915754200118563",
          sim2: "915752184724702",
          plateno: "KL07CE4417",
          contactno: "9846608006",
          validityperiod: "1 Year",
          renewalrequestdate: "2022-12-29",
          renewalrequestby: "sabbtech",
          priviouscommercialactivationdate: "2021-10-19",
          priviouscardenddate: "2022-10-18",
          priviouscardstatus: "PD",
          cardactivationdate: "",
          cardenddate: "",
          cardstatus: "",
          purcomment: null,
          comment: "",
          renewalno: 1,
          headerid: 316,
          companyid: "apm",
          serialno: "SABB-0025-BOX-01",
          slotno: "SABB-0025",
          totalbox: 1,
          renewalrequestdate1: "2022-12-29T00:00:00.000+00:00",
          createddate: "2023-01-28",
          createdby: "apm-sa",
          renewalmessage:
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal",
          rowcolor: null,
        },
        {
          renewalrequestid: "RE-00110",
          vltdsno: "APM1K2I102100007605",
          invoiceno: "",
          iccidno1: "8991102105467083933F",
          iccidno2: "8991102105467083933F",
          imei: "865006044586338",
          sim1: "915754200187426",
          sim2: "915752184724944",
          plateno: "KL-04-AF-0266",
          contactno: "9846066966",
          validityperiod: "1 Year",
          renewalrequestdate: "2022-12-08",
          renewalrequestby: "sabbtech",
          priviouscommercialactivationdate: "2021-10-22",
          priviouscardenddate: "2022-10-21",
          priviouscardstatus: "PD",
          cardactivationdate: "",
          cardenddate: "",
          cardstatus: "",
          purcomment: null,
          comment: "",
          renewalno: 1,
          headerid: 316,
          companyid: "apm",
          serialno: "SABB-0025-BOX-01",
          slotno: "SABB-0025",
          totalbox: 1,
          renewalrequestdate1: "2022-12-08T00:00:00.000+00:00",
          createddate: "2023-01-28",
          createdby: "apm-sa",
          renewalmessage:
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal",
          rowcolor: null,
        },
      ];
      this.dataSource = new window.Smart.DataAdapter({
        dataSource: res,
        dataFields: [
          "imei: string",
          "iccidno1: string",
          "carequestdate",
          "string",
          "slotno",
          "string",
          "serialno",
          "string",
          "comment",
          "string",
          "purcomment",
          "string",
        ],
      });
    });

    // let url = 'https://mvt.apmkingstrack.com/fleettracking/esim/getDealerRenewalPending?companyid=apm&dealer=apm-sa'
    // this.ajaxService.ajaxGet(url).subscribe(res => {
    //   this.data.push(res)
    // })
  }
  pendingRenewalDashboard() {
    this.showLoading();
    this.columns = [
      {
        label: "IMEI No",
        dataField: "imei",
        dataType: "number",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "ICCID No",
        dataField: "iccidno1",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "Renewal Requested Date",
        dataField: "renewalrequestdate",
        dataType: "number",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "Previous Card Status",
        dataField: "priviouscardstatus",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "Contact Number",
        dataField: "contactno",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "Stage",
        dataField: "renewalno",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "Comments",
        dataField: "purcomment",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<span >${
            settings.value == "" || settings.value == null
              ? "--"
              : settings.value
          }</span >`;
        },
      },
      {
        label: "",
        dataField: "comment",
        dataType: "string",
        width: 30,
        formatFunction(settings) {
          settings.template = `<smart-button row-id="${settings.row}" class="remove-button">Comments</smart-button>`;
        },
      },
    ];

    let url =
      serverUrl.web +
      "/esim/getDealerRenewalPending?companyid=apm&dealer=" +
      this.dealer;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.loadingCtrl.dismiss();
      this.enablebanner(res.length);
      this.data = [
        {
          renewalrequestid: "RE-00110",
          vltdsno: "APM1K2I102100007320",
          invoiceno: "",
          iccidno1: "8991102105467081515F",
          iccidno2: "8991102105467081515F",
          imei: "865006044572114",
          sim1: "915754200118563",
          sim2: "915752184724702",
          plateno: "KL07CE4417",
          contactno: "9846608006",
          validityperiod: "1 Year",
          renewalrequestdate: "2022-12-29",
          renewalrequestby: "sabbtech",
          priviouscommercialactivationdate: "2021-10-19",
          priviouscardenddate: "2022-10-18",
          priviouscardstatus: "PD",
          cardactivationdate: "",
          cardenddate: "",
          cardstatus: "",
          purcomment: null,
          comment: "",
          renewalno: 1,
          headerid: 316,
          companyid: "apm",
          serialno: "SABB-0025-BOX-01",
          slotno: "SABB-0025",
          totalbox: 1,
          renewalrequestdate1: "2022-12-29T00:00:00.000+00:00",
          createddate: "2023-01-28",
          createdby: "apm-sa",
          renewalmessage:
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal",
          rowcolor: null,
        },
        {
          renewalrequestid: "RE-00110",
          vltdsno: "APM1K2I102100007605",
          invoiceno: "",
          iccidno1: "8991102105467083933F",
          iccidno2: "8991102105467083933F",
          imei: "865006044586338",
          sim1: "915754200187426",
          sim2: "915752184724944",
          plateno: "KL-04-AF-0266",
          contactno: "9846066966",
          validityperiod: "1 Year",
          renewalrequestdate: "2022-12-08",
          renewalrequestby: "sabbtech",
          priviouscommercialactivationdate: "2021-10-22",
          priviouscardenddate: "2022-10-21",
          priviouscardstatus: "PD",
          cardactivationdate: "",
          cardenddate: "",
          cardstatus: "",
          purcomment: null,
          comment: "",
          renewalno: 1,
          headerid: 316,
          companyid: "apm",
          serialno: "SABB-0025-BOX-01",
          slotno: "SABB-0025",
          totalbox: 1,
          renewalrequestdate1: "2022-12-08T00:00:00.000+00:00",
          createddate: "2023-01-28",
          createdby: "apm-sa",
          renewalmessage:
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal",
          rowcolor: null,
        },
      ];
      this.dataSource = new window.Smart.DataAdapter({
        dataSource: res,
        dataFields: [
          "imei: string",
          "iccidno1: string",
          "renewalrequestdate",
          "string",
          "priviouscardstatus",
          "string",
          "contactno",
          "string",
          "renewalno",
          "string",
          "purcomment",
          "string",
          "comment",
          "string",
        ],
      });
    });
  }

  pendingExtra1YearDashboard() {
    this.showLoading();
    this.columns = [
      {
        label: "Imei No",
        dataField: "imei",
        dataType: "number",
        width: 30,
      },
      {
        label: "ICCID No",
        dataField: "iccidno1",
        dataType: "string",
        width: 30,
      },
      {
        label: "Requested Date",
        dataField: "renewalrequestdate",
        dataType: "string",
        width: 30,
      },
    ];

    let url =
      serverUrl.web +
      "/esim/getDealerExtendOneYearPending?companyid=apm&dealer=" +
      this.dealer;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.loadingCtrl.dismiss();
      this.enablebanner(res.length);
      this.data = [
        {
          renewalrequestid: "RE-00110",
          vltdsno: "APM1K2I102100007320",
          invoiceno: "",
          iccidno1: "8991102105467081515F",
          iccidno2: "8991102105467081515F",
          imei: "865006044572114",
          sim1: "915754200118563",
          sim2: "915752184724702",
          plateno: "KL07CE4417",
          contactno: "9846608006",
          validityperiod: "1 Year",
          renewalrequestdate: "2022-12-29",
          renewalrequestby: "sabbtech",
          priviouscommercialactivationdate: "2021-10-19",
          priviouscardenddate: "2022-10-18",
          priviouscardstatus: "PD",
          cardactivationdate: "",
          cardenddate: "",
          cardstatus: "",
          purcomment: null,
          comment: "",
          renewalno: 1,
          headerid: 316,
          companyid: "apm",
          serialno: "SABB-0025-BOX-01",
          slotno: "SABB-0025",
          totalbox: 1,
          renewalrequestdate1: "2022-12-29T00:00:00.000+00:00",
          createddate: "2023-01-28",
          createdby: "apm-sa",
          renewalmessage:
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal",
          rowcolor: null,
        },
        {
          renewalrequestid: "RE-00110",
          vltdsno: "APM1K2I102100007605",
          invoiceno: "",
          iccidno1: "8991102105467083933F",
          iccidno2: "8991102105467083933F",
          imei: "865006044586338",
          sim1: "915754200187426",
          sim2: "915752184724944",
          plateno: "KL-04-AF-0266",
          contactno: "9846066966",
          validityperiod: "1 Year",
          renewalrequestdate: "2022-12-08",
          renewalrequestby: "sabbtech",
          priviouscommercialactivationdate: "2021-10-22",
          priviouscardenddate: "2022-10-21",
          priviouscardstatus: "PD",
          cardactivationdate: "",
          cardenddate: "",
          cardstatus: "",
          purcomment: null,
          comment: "",
          renewalno: 1,
          headerid: 316,
          companyid: "apm",
          serialno: "SABB-0025-BOX-01",
          slotno: "SABB-0025",
          totalbox: 1,
          renewalrequestdate1: "2022-12-08T00:00:00.000+00:00",
          createddate: "2023-01-28",
          createdby: "apm-sa",
          renewalmessage:
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal",
          rowcolor: null,
        },
      ];
      this.dataSource = new window.Smart.DataAdapter({
        dataSource: res,
        dataFields: [
          "imei: string",
          "iccidno1: string",
          "renewalrequestdate: string",
        ],
      });
    });

    // let url = 'https://mvt.apmkingstrack.com/fleettracking/esim/getDealerExtendOneYearPending?companyid=apm&dealer=apm-sa'
    // this.ajaxService.ajaxGet(url).subscribe(res => {
    //   this.data.push(res)
    // })
  }
  pendingTopupDashboard() {
    this.showLoading();
    this.columns = [
      {
        label: "Imei No",
        dataField: "imei",
        dataType: "number",
        width: 30,
      },
      {
        label: "ICCID No",
        dataField: "iccidno1",
        dataType: "string",
        width: 30,
      },

      {
        label: "Topup Requested Date",
        dataField: "renewalrequestdate",
        dataType: "string",
        width: 30,
      },
    ];

    let url =
      serverUrl.web +
      "/esim/getDealerTopupPending?companyid=apm&dealer=" +
      this.dealer;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.loadingCtrl.dismiss();
      this.enablebanner(res.length);
      this.data = [
        {
          renewalrequestid: "RE-00110",
          vltdsno: "APM1K2I102100007320",
          invoiceno: "",
          iccidno1: "8991102105467081515F",
          iccidno2: "8991102105467081515F",
          imei: "865006044572114",
          sim1: "915754200118563",
          sim2: "915752184724702",
          plateno: "KL07CE4417",
          contactno: "9846608006",
          validityperiod: "1 Year",
          renewalrequestdate: "2022-12-29",
          renewalrequestby: "sabbtech",
          priviouscommercialactivationdate: "2021-10-19",
          priviouscardenddate: "2022-10-18",
          priviouscardstatus: "PD",
          cardactivationdate: "",
          cardenddate: "",
          cardstatus: "",
          purcomment: null,
          comment: "",
          renewalno: 1,
          headerid: 316,
          companyid: "apm",
          serialno: "SABB-0025-BOX-01",
          slotno: "SABB-0025",
          totalbox: 1,
          renewalrequestdate1: "2022-12-29T00:00:00.000+00:00",
          createddate: "2023-01-28",
          createdby: "apm-sa",
          renewalmessage:
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal",
          rowcolor: null,
        },
        {
          renewalrequestid: "RE-00110",
          vltdsno: "APM1K2I102100007605",
          invoiceno: "",
          iccidno1: "8991102105467083933F",
          iccidno2: "8991102105467083933F",
          imei: "865006044586338",
          sim1: "915754200187426",
          sim2: "915752184724944",
          plateno: "KL-04-AF-0266",
          contactno: "9846066966",
          validityperiod: "1 Year",
          renewalrequestdate: "2022-12-08",
          renewalrequestby: "sabbtech",
          priviouscommercialactivationdate: "2021-10-22",
          priviouscardenddate: "2022-10-21",
          priviouscardstatus: "PD",
          cardactivationdate: "",
          cardenddate: "",
          cardstatus: "",
          purcomment: null,
          comment: "",
          renewalno: 1,
          headerid: 316,
          companyid: "apm",
          serialno: "SABB-0025-BOX-01",
          slotno: "SABB-0025",
          totalbox: 1,
          renewalrequestdate1: "2022-12-08T00:00:00.000+00:00",
          createddate: "2023-01-28",
          createdby: "apm-sa",
          renewalmessage:
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal",
          rowcolor: null,
        },
      ];
      this.dataSource = new window.Smart.DataAdapter({
        dataSource: res,
        dataFields: [
          "imei: string",
          "iccidno1: string",
          "renewalrequestdate: string",
        ],
      });
    });

    // let url = 'https://mvt.apmkingstrack.com/fleettracking/esim/getDealerTopupPending?companyid=apm&dealer=apm-sa'
    // this.ajaxService.ajaxGet(url).subscribe(res => {
    //   this.data.push(res)
    // })
  }
  pendingBSNLCertificateDashboard() {
    this.showLoading();
    this.columns = [
      {
        label: "IMEI No",
        dataField: "imei",
        dataType: "number",
        width: 30,
      },
      {
        label: "ICCID No",
        dataField: "iccidno1",
        dataType: "string",
        width: 30,
      },
      {
        label: "Requested Date",
        dataField: "renewalrequestdate",
        dataType: "string",
        width: 30,
      },
    ];

    let url =
      serverUrl.web +
      "/esim/getDealerCertificatePending?companyid=apm&dealer=" +
      this.dealer;
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.loadingCtrl.dismiss();
      this.enablebanner(res.length);
      this.data = [
        {
          renewalrequestid: "RE-00110",
          vltdsno: "APM1K2I102100007320",
          invoiceno: "",
          iccidno1: "8991102105467081515F",
          iccidno2: "8991102105467081515F",
          imei: "865006044572114",
          sim1: "915754200118563",
          sim2: "915752184724702",
          plateno: "KL07CE4417",
          contactno: "9846608006",
          validityperiod: "1 Year",
          renewalrequestdate: "2022-12-29",
          renewalrequestby: "sabbtech",
          priviouscommercialactivationdate: "2021-10-19",
          priviouscardenddate: "2022-10-18",
          priviouscardstatus: "PD",
          cardactivationdate: "",
          cardenddate: "",
          cardstatus: "",
          purcomment: null,
          comment: "",
          renewalno: 1,
          headerid: 316,
          companyid: "apm",
          serialno: "SABB-0025-BOX-01",
          slotno: "SABB-0025",
          totalbox: 1,
          renewalrequestdate1: "2022-12-29T00:00:00.000+00:00",
          createddate: "2023-01-28",
          createdby: "apm-sa",
          renewalmessage:
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal",
          rowcolor: null,
        },
        {
          renewalrequestid: "RE-00110",
          vltdsno: "APM1K2I102100007605",
          invoiceno: "",
          iccidno1: "8991102105467083933F",
          iccidno2: "8991102105467083933F",
          imei: "865006044586338",
          sim1: "915754200187426",
          sim2: "915752184724944",
          plateno: "KL-04-AF-0266",
          contactno: "9846066966",
          validityperiod: "1 Year",
          renewalrequestdate: "2022-12-08",
          renewalrequestby: "sabbtech",
          priviouscommercialactivationdate: "2021-10-22",
          priviouscardenddate: "2022-10-21",
          priviouscardstatus: "PD",
          cardactivationdate: "",
          cardenddate: "",
          cardstatus: "",
          purcomment: null,
          comment: "",
          renewalno: 1,
          headerid: 316,
          companyid: "apm",
          serialno: "SABB-0025-BOX-01",
          slotno: "SABB-0025",
          totalbox: 1,
          renewalrequestdate1: "2022-12-08T00:00:00.000+00:00",
          createddate: "2023-01-28",
          createdby: "apm-sa",
          renewalmessage:
            "Selected ICCID is not yet activated thus it cannot be Requested for Renewal",
          rowcolor: null,
        },
      ];
      this.dataSource = new window.Smart.DataAdapter({
        dataSource: res,
        dataFields: [
          "imei: string",
          "iccidno1: string",
          "renewalrequestdate: string",
        ],
      });
    });

    // let url = 'https://mvt.apmkingstrack.com/fleettracking/esim/getDealerCertificatePending?companyid=apm&dealer=apm-sa'
    // this.ajaxService.ajaxGet(url).subscribe(res => {
    //   this.data.push(res)
    // })
  }

  commentsData() {
    this.columns = [
      {
        label: "Comments",
        dataField: "comment",
        dataType: "string",
        width: 30,
      },
    ];

    this.dataSource = new window.Smart.DataAdapter({
      dataSource: JSON.parse(this.value),
      dataFields: ["comment: string"],
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.dealer != "") {
      if (this.grid == 1) {
        this.pendingCADashboard();
      } else if (this.grid == 2) {
        this.pendingRenewalDashboard();
      } else if (this.grid == 3) {
        this.pendingExtra1YearDashboard();
      } else if (this.grid == 4) {
        this.pendingTopupDashboard();
      } else if (this.grid == 5) {
        this.pendingBSNLCertificateDashboard();
      }
    }
  }
  ngOnInit() {
    console.log(this.data);
    if (this.value != undefined) {
      this.commentsData();
    }
  }
}
