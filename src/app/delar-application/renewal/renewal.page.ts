import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { AddrenewalComponent } from '../addrenewal/addrenewal.component';

@Component({
  selector: 'app-renewal',
  templateUrl: './renewal.page.html',
  styleUrls: ['./renewal.page.scss'],
})
export class RenewalPage implements OnInit {
  source: { localdata: any; };
  dataAdapter: any;
  renderer: (row: number, column: any, value: string) => string;
  @ViewChild('myGrid', { static: false }) myGrid: jqxGridComponent;
  head = ['Plate No', 'AlertType', 'E-Mail ID', 'Valid Till', 'Status'];
  columns: ({ text: string; datafield: string; cellsrenderer: (row: number, column: any, value: string) => string; } | { text: string; datafield: string; cellsrenderer?: undefined; })[];
  selectedRowIdx: any;
  selectedRow;
  constructor( private modalController: ModalController) { }



  async openModel() {
    const modal = await this.modalController.create({
      component: AddrenewalComponent,
      cssClass: "custom-renewal",
    });
    modal.onDidDismiss().then(() => {
      // if (this.myPlatform == "desktop") {
      //   this.myGrid.clearselection();
      // }

      // this.getDatas();
    })
    return await modal.present();
  }
  myGridOnRowSelect(event: any): void {
    this.selectedRow = event.args.row;
    //  event.isTrigger = false
    this.selectedRowIdx = event.args.rowindex;
  }

  ngOnInit() {
  }

}
