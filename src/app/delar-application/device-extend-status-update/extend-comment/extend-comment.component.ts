import { Component, Input, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-extend-comment",
  templateUrl: "./extend-comment.component.html",
  styleUrls: ["./extend-comment.component.scss"],
})
export class ExtendCommentComponent implements OnInit {
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
      extendoneyearvaliditymonth: ["", Validators.required],
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
    var data = {
      iccidno: this.value.bounddata.iccidno1,
      extendoneyearvaliditymonth: this.value.bounddata.validityperiod,
      comment: this.topupForm.value.comment,
      createdby: localStorage.getItem("userName"),
    };
    const url = serverUrl.web + "/esim/saveEsimExtendOneYearStatus";
    this.ajaxService.ajaxPostWithBody(url, data).subscribe((res) => {
      if (res.message == "Extend One Year Status Updated Successfully") {
        this.commonService.showConfirm(res.message);

        this.modalController.dismiss({
          data: "Extend One Year Status Updated Successfully",
        });
      } else {
        this.commonService.showConfirm(res.message);
      }
    });
  }

  ngOnInit() {
    this.createForm();
    if (Object.keys(this.value).length != 0) {
      console.log(this.value.bounddata.validityperiod);
      this.topupForm.patchValue({
        extendoneyearvaliditymonth: this.value.bounddata.validityperiod,
      });
    }
  }
}
