import { Component, OnInit,ViewChild,ElementRef,Input} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { jqxGridComponent } from 'jqwidgets-ng/jqxgrid';
import { SktService } from 'src/app/services/skt.service';
import { ParentAdditionalComponent } from '../../parent/parent-additional/parent-additional.component';
import { BusStopComponent } from '../bus-stop/bus-stop.component';
import { RouteAddtionalComponent } from '../route-addtional/route-addtional.component';
import { FormGroup,FormBuilder,FormControlName, Validators } from '@angular/forms';

@Component({
  selector: 'app-route-trip',
  templateUrl: './route-trip.page.html',
  styleUrls: ['./route-trip.page.scss'],
})
export class RouteTripPage implements OnInit {

ngOnInit() {}

}
