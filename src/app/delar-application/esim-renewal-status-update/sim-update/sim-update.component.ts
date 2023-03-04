import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-sim-update",
  templateUrl: "./sim-update.component.html",
  styleUrls: ["./sim-update.component.scss"],
})
export class SimUpdateComponent implements OnInit {
  simupdate: FormGroup;
  @Input() value: any;
  @Input() renewal: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  createForm() {
    this.simupdate = this.formBuilder.group({
      vltdsno: ["", Validators.required],
      imeino: ["", Validators.required],
      sim1: ["", Validators.required],
      sim2: ["", Validators.required],
    });
  }

  submitBtn() {
    // //mvt.apmkingstrack.com/fleettracking/esim/updatesimno?vltdsno=APM1K2I012200012317&imei=872345617823456&renewalno=1&oldsimno1=915752184840824&olasimno2=915754202253241&newsimno1=915752184840824&newsimno2=915754202253241changedby=apm-sa
    // https:
    const url =
      serverUrl.web +
      "/esim/updatesimno?vltdsno=" +
      this.simupdate.value.vltdsno +
      "&imei=" +
      this.value.imei +
      "&renewalno=" +
      this.renewal +
      "&oldsimno1=" +
      this.value.sim1 +
      "&oldsimno2=" +
      this.value.sim2 +
      "&newsimno1=" +
      this.simupdate.value.sim1 +
      "&newsimno2=" +
      this.simupdate.value.sim2 +
      "&changedby=" +
      localStorage.getItem("userName");
    this.ajaxService.ajaxGetPerference(url).subscribe((res) => {
      if (res.message == "Changed Successfully") {
        this.commonService.showConfirm(res.message);

        this.modalController.dismiss({
          data: "Changed Successfully",
        });
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  cancelBtn() {
    this.modalController.dismiss();
  }

  ngOnInit() {
    this.createForm();
    if (Object.keys(this.value).length != 0) {
      console.log(this.value.vltdsno, this.value.sim1, this.value.sim2);
      this.simupdate.patchValue({
        vltdsno: this.value.vltdsno,
        imeino: this.value.imei,
        sim1: this.value.sim1,
        sim2: this.value.sim2,
      });
    }
  }
}
