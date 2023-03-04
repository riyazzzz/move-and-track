import { Component, Input, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModalController, Platform } from "@ionic/angular";
import { jqxGridComponent } from "jqwidgets-ng/jqxgrid";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";
import { serverUrl } from "src/environments/environment";

@Component({
  selector: "app-comment",
  templateUrl: "./comment.component.html",
  styleUrls: ["./comment.component.scss"],
})
export class CommentComponent implements OnInit {
  commentForm: FormGroup;
  @ViewChild("myGrid", { static: false }) myGrid: jqxGridComponent;
  columns: any;
  source: { localdata: any };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  myPlatform: any;
  selectedRow: any;
  tableData: any;
  page = [];
  @Input() value: any;

  constructor(
    private platform: Platform,
    private formBuilder: FormBuilder,
    private modalController: ModalController,
    private ajaxService: AjaxService,
    private commonService: CommonService
  ) {}

  createForm() {
    this.commentForm = this.formBuilder.group({
      comment: ["", Validators.required],
    });
  }

  clear() {
    this.commentForm.patchValue({
      comment: "",
    });
  }
  cancelBtn() {
    this.modalController.dismiss();
  }

  submitBtn() {
    var data = {
      iccidno: this.value.iccidno1.toString(),
      comment: this.commentForm.value.comment.toString(),
      createdby: this.value.createdby.toString(),
    };
    var url = serverUrl.web + "/esim/saveEsimCAComment";
    this.ajaxService
      .ajaxPostWithString(url, JSON.stringify(data))
      .subscribe((res) => {
        if (JSON.parse(res).message == "Esim CA Comment Saved Successfully") {
          this.commonService.showConfirm("Esim CA Comment Saved Successfully");
          this.clear();
          this.modalController.dismiss({
            data: "Esim CA Comment Saved Successfully",
          });
        } else {
          this.commonService.showConfirm(JSON.parse(res).message);
        }
      });
  }

  getDatas() {
    this.page = [];
    if (this.value.comment != "") {
      this.tableData = JSON.parse(this.value.comment);
    }
    this.page = ["100", "200", "500", "1000"];
    this.renderer = (row: number, column: any, value: string) => {
      if (value == "" || null || undefined || value == ",") {
        return "--";
      } else {
        return (
          '<span style="line-height:32px;font-size:17px;color:darkblue;margin:auto;padding-left: 5px;">' +
          value +
          "</span>"
        );
      }
    };

    this.source = { localdata: this.tableData };
    this.dataAdapter = new jqx.dataAdapter(this.source);
    this.columns = [
      {
        text: "Comment",
        datafield: "comment",
        cellsrenderer: this.renderer,
        cellsalign: "left",
        align: "left",
        width: 500,
      },
    ];
  }

  ngOnInit() {
    this.createForm();
    this.getDatas();
  }
}
