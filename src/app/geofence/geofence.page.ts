import { Component, OnInit } from '@angular/core';
import { GeofenceModelPage } from './geofence-model/geofence-model.page';
import { ModalController, Platform, MenuController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-geofence',
  templateUrl: './geofence.page.html',
  styleUrls: ['./geofence.page.scss'],
  
})
export class GeofencePage implements OnInit {
  
  geoFenceJson;
  selectedVin: any;
  filterValue: any;
  
  constructor(
    private activatedRoute: ActivatedRoute,
    ) {  }
    
    
    ngOnInit() { 
      this.filterValue = this.activatedRoute.snapshot.paramMap.get("type"); 
    }
    
  }
  