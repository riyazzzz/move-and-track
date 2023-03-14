import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { AlertController, Platform } from "@ionic/angular";
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";

@Component({
  selector: "app-esim-home",
  templateUrl: "./esim-home.page.html",
  styleUrls: ["./esim-home.page.scss"],
})
export class EsimHomePage implements OnInit {
  makeFilter;
  showGrid = "1";
  data;
  myPlatform: any;
  dealer = "apm-sa";
  constructor(
    private ajaxService: AjaxService,
    public platform: Platform,
    private router: Router,
    private alertController: AlertController,
    private commonService: CommonService
  ) {}
  ngOnInit(): void {
    this.myPlatform = this.platform.platforms()[0];
    if (this.myPlatform == "tablet") {
      this.myPlatform = "desktop";
    }
    let url =
      "https://mvt.apmkingstrack.com/fleettracking/global/getesimdealerlist";
    this.ajaxService.ajaxGet(url).subscribe((res) => {
      this.data = res;
    });
  }

  switchGrid(d) {
    this.showGrid = d;
  }

  handleChange(e) {
    this.dealer = e.value;
  }
}
