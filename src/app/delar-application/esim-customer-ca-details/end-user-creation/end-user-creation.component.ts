import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { app, serverUrl } from "src/environments/environment";

@Component({
  selector: "app-end-user-creation",
  templateUrl: "./end-user-creation.component.html",
  styleUrls: ["./end-user-creation.component.scss"],
})
export class EndUserCreationComponent implements OnInit {
  @Input() value: any;
  addCompany: FormGroup;
  assertCategories = [
    "Car",
    "Bike",
    "Bus",
    "Truck",
    "Auto",
    "Fork Lifts",
    "Light Towers",
    "Welding Machines",
    "Deepsea Generator",
    "Compressors",
    "32kw CEM7 Generators",
    "Battery",
    "Bobcat",
    "Tanker",
    "Loader",
    "Dabbab",
    "Dumper",
    "Street Sweeper",
    "Towed Street Sweeper",
    "Compactor",
    "Double Cabin",
    "Hook Lift",
    "Crane",
    "Small Truck",
  ];

  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {}

  cancelBtn() {
    this.modalController.dismiss();
  }

  createForm() {
    this.addCompany = this.formBuilder.group({
      imeiNo: ["", Validators.required],
      contactNo: ["", Validators.required],
      plateNo: ["", Validators.required],
      address: ["", Validators.required],
      assetCategory: ["", Validators.required],
      engineno: [""],
      chassisno: [""],
    });
  }

  clear() {
    this.addCompany.patchValue({
      imeiNo: "",
      contactNo: "",
      plateNo: "",
      address: "",
      assetCategory: "",
      engineno: "",
      chassisno: "",
    });
  }

  getdetails() {
    this.addCompany.patchValue({
      imeiNo: this.value.imei,
    });
  }

  onadd() {
    if (this.addCompany.value.contactNo.toString().length != 10) {
      this.commonService.presentToast("Enter the 10 Digit Contact Number");
    } else if (this.addCompany.valid) {
      const url =
        serverUrl.web +
        "/global/validate/contact?contactNo=" +
        this.addCompany.value.contactNo;
      this.ajaxService.ajaxGet(url).subscribe((res) => {
        if (res.message == "Not Available") {
          this.onSubmit();
        } else {
          this.commonService.showConfirm(res.message);
        }
      });
    } else {
      this.commonService.presentToast("Fill required field..");
    }
  }

  onSubmit() {
    var data;
    data = {
      companyId: this.addCompany.value.contactNo,
      contactNo: this.addCompany.value.contactNo,
      imeiNo: this.value.imei,
      icon: this.addCompany.value.assetCategory,
      plateNo: this.addCompany.value.plateNo,
      address: this.addCompany.value.address,
      engineno: this.addCompany.value.engineno,
      chassisno: this.addCompany.value.chassisno,
    };

    const url = serverUrl.web + "/site/NewVehicleCreation";
    this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
      if (res.message == "Added Successfully") {
        this.modalController.dismiss({
          data: "Added Successfully",
        });
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  ngOnInit() {
    this.createForm();
    this.getdetails();
  }
}
