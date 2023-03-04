import { Component, OnInit, Input } from '@angular/core';
import { serverUrl } from 'src/environments/environment';
import { AjaxService } from 'src/app/services/ajax.service';
import { variable } from '@angular/compiler/src/output/output_ast';
import {app} from '../../../environments/environment'
@Component({
  selector: 'app-week-odometer',
  templateUrl: './week-odometer.component.html',
  styleUrls: ['./week-odometer.component.scss'],
})
export class WeekOdometerComponent implements OnInit {
  selectedCard: any;
  odometer: any;
data=0.3;
vehicleType=''
  @Input() gridView;
  mobile = true;
  details;
  entryPoint;
  constructor(
    public ajaxService: AjaxService
  ) { }

  odometerWeek() {
  this.vehicleType = JSON.parse(localStorage.getItem('selectedVin')).icon;
    const url = serverUrl.web + '/device/new/odometerdetails?vin=' + this.selectedCard;
    this.ajaxService.ajaxGet(url).subscribe(res => {
    // res= {"fuel":50,"engine":{"today":"03:15:15","total":"209:00:00"},"odometer":[{"date":"2021-06-30","odometer":"2"},
    //     {"date":"2021-06-29","odometer":"20"},{"date":"2021-06-28","odometer":"1"}]}
        this.details = res 
       if(this.vehicleType == "LOADER" || res.isFuel){
         this.odometer =  res.odometer.slice(0,3)
        }else{
          this.odometer = res.odometer
        }
      
      })
  }

  ngOnInit() {
    this.entryPoint = app.entryPoint;
    if (this.gridView) {
      this.selectedCard = this.gridView;
      this.mobile = false;
    } else {
      this.selectedCard = JSON.parse(localStorage.selectedVin).vin;
    }

    this.odometerWeek()
  }
  ngOnChanges(changes): void {

    if (this.gridView) {
      this.selectedCard = this.gridView;
      this.mobile = false;
    } else {
      this.selectedCard = JSON.parse(localStorage.selectedVin).vin;
    }

    this.odometerWeek()
  }

}
