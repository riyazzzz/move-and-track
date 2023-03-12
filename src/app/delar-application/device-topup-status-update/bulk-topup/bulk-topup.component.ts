import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-bulk-topup",
  templateUrl: "./bulk-topup.component.html",
  styleUrls: ["./bulk-topup.component.scss"],
})
export class BulkTopupComponent implements OnInit {
  topupForm: FormGroup;
  @Input() value: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  createForm() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.topupForm = this.formBuilder.group({
      topupvaliditymonth: ["", Validators.required],
      comment: ["", Validators.required],
    });
  }

  clear() {
    var now = new Date();
    var day = ("0" + now.getDate()).slice(-2);
    var month = ("0" + (now.getMonth() + 1)).slice(-2);
    var today = now.getFullYear() + "-" + month + "-" + day;
    this.topupForm.patchValue({
      comment: "",
    });
  }

  cancelBtn() {
    this.modalController.dismiss();
  }

  submitBtn() {
    var data = [];
    this.value.map((d) => {
      let { validityperiod, ...rest } = d;
      data.push({
        ...rest,
        topupvaliditymonth: this.topupForm.value.topupvaliditymonth,
        comment: this.topupForm.value.comment,
      });
    });
    const url = serverUrl.web + "/esim/saveEsimBulkTopupStatus";
    this.ajaxService
      .ajaxPostWithBody(url, JSON.stringify(data))
      .subscribe((res) => {
        if (res.message == "Topup Status Updated Successfully") {
          this.modalController.dismiss({
            data: "Topup Status Updated Successfully",
          });
        } else {
          this.commonService.showConfirm(res.message);
        }
      });
  }

  ngOnInit() {
    this.createForm();
    if (Object.keys(this.value).length != 0) {
      console.log(this.value.validityperiod);
      this.topupForm.patchValue({
        topupvaliditymonth: this.value[0].validityperiod,
      });
    }
  }
}