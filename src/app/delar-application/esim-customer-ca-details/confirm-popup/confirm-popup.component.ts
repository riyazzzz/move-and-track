import { Component, OnInit } from "@angular/core";
import { FormBuilder } from "@angular/forms";
import { Router } from "@angular/router";
import { ModalController } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-confirm-popup",
  templateUrl: "./confirm-popup.component.html",
  styleUrls: ["./confirm-popup.component.scss"],
})
export class ConfirmPopupComponent implements OnInit {
  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private commonService: CommonService,
    private formBuilder: FormBuilder,
    private modalController: ModalController
  ) {}
  selectedValue = 1;

  cancelBtn() {
    this.modalController.dismiss();
  }
  get(d) {
    this.modalController.dismiss({ data: this.selectedValue });
  }
  ngOnInit() {}
}
