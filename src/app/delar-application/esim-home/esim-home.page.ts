import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AjaxService } from "src/app/services/ajax.service";
import { CommonService } from "src/app/services/common.service";


@Component({
  selector: 'app-esim-home',
  templateUrl: './esim-home.page.html',
  styleUrls: ['./esim-home.page.scss'],
})
export class EsimHomePage implements OnInit {

  makeFilter;
  data;
  dealer = 'apm-sa'
  constructor(
    private ajaxService: AjaxService,
    private router: Router,
    private alertController: AlertController,
    private commonService: CommonService,) { }
  ngOnInit(): void {
    let url = 'https://mvt.apmkingstrack.com/fleettracking/esim/getDealer'
    this.ajaxService.ajaxGet(url).subscribe(res => {
      this.data = res
    })
  }




  handleChange(e) {
    this.dealer = e.detail.value

  }





}
