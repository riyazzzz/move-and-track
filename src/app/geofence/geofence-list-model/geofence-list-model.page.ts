import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { CommonService } from 'src/app/services/common.service';
import { AjaxService } from '../../services/ajax.service';
import { serverUrl } from "../../../environments/environment";
@Component({
  selector: 'app-geofence-list-model',
  templateUrl: './geofence-list-model.page.html',
  styleUrls: ['./geofence-list-model.page.scss'],
})
export class GeofenceListModelPage implements OnInit {
  @Input() geozoneObject;
  constructor(
    public modalController: ModalController,
    private commonService: CommonService,
    private ajaxService: AjaxService
  ) { }
  ngOnInit() {
  }
  getBack() {
    this.modalController.dismiss();
  }
  disassociateGeozone(data) {
    const detailsForAssign = { vin: data.Vin, geoIds: [data.Status], operation: 'disassociation' };
    const url = serverUrl.web + '/zone/geozone/vehicle/associate';
    this.ajaxService.ajaxPostWithString(url, detailsForAssign)
      .subscribe(res => {
        console.log(res);
        this.succSaveZone(res, data.Vin);
      }, err => {
        console.log(err);
      });
  }
  succSaveZone(data, vin) {
    if (data === 'success') {
      this.commonService.presentToast('Your vehicle disassociated successfully');
      this.geozoneObject = this.geozoneObject.filter(geo => {
        if (geo.Vin != vin) {
          return true;
        }
      });
    } else {
      this.commonService.presentAlert('Error', 'Vehicle not deleted');
    }
  }
}
