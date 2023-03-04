import { Injectable } from '@angular/core';
import { OpenlayerMapService } from './openlayer-map.service';
import { GoogleMapService } from  './google-map.service' 

export interface coordinates{
  lat : number;
  lng : number;
}

@Injectable({
  providedIn: 'root'
})
export abstract class AuthMapService {
  
  constructor(){
  }
  map:String;
  abstract loadMap(mapRef: any, latLng: coordinates ,cluster: boolean,clickEvent: any);
  abstract addMarker(mapData: any, latLng: coordinates,id: String , image: String);
  abstract addMarkerWithInfoWindow(mapData: any, latLng: coordinates, contentString: object, icon: string);
  abstract setCenter(map: any, latLng : coordinates); 
  abstract moveMarker(map: any, id: String , lon: number, lat: number, image: string, content: string ,lineString: coordinates[]);
  abstract createLine(map: any, pathData: any); 
  abstract fitBounds(map: any, item: any);
  abstract clearLayers (map: any, data: any);
  abstract createCircle(map: any,latLng: coordinates,range: number, type:any);
  abstract getRadius();
  abstract getCircleCenter();
  abstract setCircleRadius(range: number);
  abstract updateCircle(latLng: coordinates);
  abstract removeMarkersById(map: any, id: string);
  abstract addClusteringMarkers(map: any,latLng: any,contentString: any);
  abstract clearClusteringMarkers(map: any, data: any) 
  abstract fitBoundsForCluster(map: any);
  abstract circleGeoZone();
  //abstract clickEvent(map : any);
  // checkMapAuth(){
  //   if(localStorage.map == "GoogleMap"){
  
  //   }else{
  
  //   }
  // }
}
