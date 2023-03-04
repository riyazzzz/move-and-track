import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AlertController, ModalController, Platform } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-imei-full-details",
  templateUrl: "./imei-full-details.page.html",
  styleUrls: ["./imei-full-details.page.scss"],
})
export class ImeiFullDetailsPage implements OnInit {
  imeidetailsForm: FormGroup;
  resultForm: FormGroup;
  imeidetails: any;
  show: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  submit() {
    if (this.imeidetailsForm.value.imeino.toString().length != 15) {
      this.commonService.showConfirm("Enter the 15 Digit Imei Number");
      this.show = false;
    } else {
      const url =
        serverUrl.web +
        "/global/getAllImeiNoDetails?imeiNo=" +
        this.imeidetailsForm.value.imeino;
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        this.show = true;
        this.imeidetails = res;
      });
    }
  }

  clear() {
    this.imeidetailsForm.patchValue({
      imeino: "",
    });
    this.show = false;
  }
  ngOnInit() {
    this.imeidetailsForm = this.formBuilder.group({
      imeino: ["", Validators.required],
    });
  }
  ionViewWillEnter() {
    this.imeidetailsForm.reset();
    this.clear();
  }
}
