import { Component, OnInit, Input } from '@angular/core';
import { AjaxService } from 'src/app/services/ajax.service';
import { serverUrl } from 'src/environments/environment';

@Component({
  selector: 'app-alert-card',
  templateUrl: './alert-card.component.html',
  styleUrls: ['./alert-card.component.scss'],
})
export class AlertCardComponent implements OnInit {
  @Input() data;
  constructor(private ajaxService: AjaxService,) { }

  ngOnInit() {}
  getBgColor(type) {
    switch (type.alertTypes) {
      case "IDLE":
        return "idle";
      
      case "OVERSPEED":
        return "overspeed";

      case "ENGINESTATUS":
        if(type.additionalInfo == 'ENGINESTATUS ON'){
          return "engineon";
        }else{
          return "engineoff";
        }
       
      case "STOP":
        return "stop";

      case "POWERCUT":
        return "powercut";

      case "WOKEUP":
        return "wokeup";
case "TEMPRATURESENSOR1":
return "temprature"; 
case "TEMPRATURESENSOR2":
return "temprature"; 
case "TEMPRATURESENSOR3":
return "temprature"; 
case "TEMPRATURESENSOR4":
return "temprature"; 
      default:
        return "idle";
    }
  }
}