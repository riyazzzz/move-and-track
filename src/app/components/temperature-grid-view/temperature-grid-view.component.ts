import { Component, OnInit, Input } from '@angular/core';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';

@Component({
  selector: 'app-temperature-grid-view',
  templateUrl: './temperature-grid-view.component.html',
  styleUrls: ['./temperature-grid-view.component.scss'],
})
export class TemperatureGridViewComponent implements OnInit {

  @Input() gridView;
  selectedCard: string;
  powerFailRes: any= [];
  doorOpenRes: any=[{date: "00-00-00", count: 0},{date: "00-00-00", count: 0}];

  constructor(
    private ajaxService: AjaxService
  ) { }

  powerFail() {
    const url = serverUrl.web + '/device/powerfaildata?vin=' + this.selectedCard;
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.powerFailRes = res;
      })
  }

  doorOpen() {
    const url = serverUrl.web + '/device/dooropendata?vin=' + this.selectedCard;
    this.ajaxService.ajaxGet(url)
      .subscribe(res => {
        this.doorOpenRes = res;
      })
  }

  ngOnInit() { }

  ngOnChanges(changes): void {
    this.selectedCard = JSON.parse(localStorage.selectedVin).vin
    // if(this.gridView == "dooropen"){
      this.doorOpen();
    // }else if(this.gridView == "powerfail"){
      this.powerFail()
    // }
   
   
  }

}
