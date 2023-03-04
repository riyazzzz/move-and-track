import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-add-esim-renewal-status-update",
  templateUrl: "./add-esim-renewal-status-update.component.html",
  styleUrls: ["./add-esim-renewal-status-update.component.scss"],
})
export class AddEsimRenewalStatusUpdateComponent implements OnInit {
  @Input() value: any;
  @Input() renewal: any

  myPlatform: string;

  constructor(
    public platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private alertController: AlertController,
    private commonService: CommonService
  ) { }
  maxDate;
  today = new Date();
  AddCaStatus: FormGroup;

  cancelBtn() {
    this.modalController.dismiss();
  }
  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    var endDate = now.getFullYear() + 1 + "-" + month + "-" + day;
    this.AddCaStatus = this.formBuilder.group({
      cardactivationdate: [today, Validators.required],
      cardenddate: [endDate, Validators.required],
      cardstatus: ["Active", Validators.required],
      comment: ["", Validators.required],
    });
  }

  edit() {
    var data = {
      renewalno: this.renewal.toString(),
      iccidno: this.value.iccidno1,
      cardactivationdate: this.AddCaStatus.value.cardactivationdate,
      cardenddate: this.AddCaStatus.value.cardenddate,
      cardstatus: this.AddCaStatus.value.cardstatus,
      comment: this.AddCaStatus.value.comment,
      createdby: this.value.createdby,
    };
    const url = serverUrl.web + "/esim/saveEsimRenewalStatus";
    this.ajaxService
      .ajaxPostWithBody(url, JSON.stringify(data))
      .subscribe((res) => {
        if (res.message == "Esim Renewal Status Saved Successfully") {
          this.commonService.showConfirm(res.message);

          this.modalController.dismiss({ data: "saved success" });
        } else {
          this.commonService.showConfirm(res.message);
        }
      });
  }
  ngOnInit() {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    this.createForm();
    this.maxDate = this.today.getFullYear() + "-";
    this.maxDate +=
      (this.today.getMonth() + 1 < 10
        ? "0" + (this.today.getMonth() + 1).toString()
        : (this.today.getMonth() + 1).toString()) + "-";
    this.maxDate +=
      this.today.getDate() < 10
        ? "0" + this.today.getDate().toString()
        : this.today.getDate().toString();

    if (Object.keys(this.value).length != 0) {
      console.log(
        this.value.cardactivationdate,
        this.value.cardenddate,
        this.value.cardstatus
      );
      this.AddCaStatus.patchValue({
        cardactivationdate: this.value.cardactivationdate,
        cardenddate: this.value.cardenddate,
        comment: this.value.purcomment,
      });
    }
  }
}
