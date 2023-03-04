import { Injectable, ElementRef } from '@angular/core';
import { coordinates, AuthMapService } from '../services/auth-map.service';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/vector';
import XYZ from 'ol/source/XYZ';
import VectorSource from 'ol/source/Vector';
import Cluster from 'ol/source/Cluster';
import { Circle as CircleStyle, Fill, Icon, Stroke, Style, Text } from 'ol/style.js';
import olFeature from 'ol/Feature.js';
import Point from 'ol/geom/Point.js';
import LineString from 'ol/geom/LineString.js';
import Circle from 'ol/geom/Circle.js';
import { containsExtent } from 'ol/extent';
import { fromLonLat } from 'ol/proj';
import { toLonLat } from 'ol/proj';
import { createEmpty } from 'ol/extent';
import { extend } from 'ol/extent';
import Overlay from 'ol/Overlay';
import Geometry from 'ol/geom/Geometry';

@Injectable({
  providedIn: 'root'
})
export class OpenlayerMapService implements AuthMapService {
  marker;
  gmarkers = [];
  polyLine;
  circle;
  lastinfowindow;
  map;

  constructor() { }

  loadMap(map: ElementRef, latLng: coordinates, cluster: boolean, clickEvent: any) {

    const vectorSource = new VectorSource({
      features: [],
      projection: 'EPSG:4326'
    })

    const clusterSource = new Cluster({
      distance: 40,
      source: vectorSource
    });

    const styleCache = {};
    let markerLayer;
    if (cluster) {
      //map.on('moveend', onMoveEnd);
      // map.on('movestart', function(event) {
      //   if(document.getElementById("markers").innerHTML == null)
      //   {
      //     markerContainer=document.getElementById("markers");
      //     markerContainer.innerHTML="";
      //   }
      // });
      let markerContainer: any;
      markerLayer = new VectorLayer({
        source: clusterSource,
        style: (feature) => {
          var size = feature.get('features').length;
          if (size == 1) {
            style = new Style({
              image: new Icon(({
                anchor: [0.5, 1],
                anchorXUnits: 'fraction',
                anchorYUnits: 'fraction',
                opacity: 1,
                crossOrigin: 'anonymous',
                src: feature.values_.features[0]["values_"]["name"]["img"]
              }))
            });
            // var markerElement=document.createElement("div");
            // markerElement.className="overlays";
            // markerElement.id = feature.values_.features[0]["values_"]["name"]["plateNo"];
            // markerElement.innerHTML=feature.values_.features[0]["values_"]["name"]["plateNo"];
            // markerContainer.appendChild(markerElement);
            // var marker = new Overlay({
            //   position: fromLonLat([latLng.lng, latLng.lat]),
            //   positioning: 'center-center',
            //   element: markerElement,
            //   stopEvent: false
            // });
            // this.map.addOverlay(marker);
            // marker.setPosition(feature["values_"]["geometry"]["flatCoordinates"]);
            //feature.setId("singleMarker");
          } else {
            var style = styleCache[size];
            if (!style) {
              style = new Style({
                image: new CircleStyle({
                  radius: 15,
                  stroke: new Stroke({
                    color: '#32384b'
                  }),
                  fill: new Fill({
                    color: '#32384b'
                  }),
                  scale: 1
                }),

                text: new Text({
                  text: size.toString(),
                  fill: new Fill({
                    color: 'white'
                  }),
                  stroke: new Stroke({
                    color: 'white',
                    width: 1
                  }),
                })
              });
              styleCache[size] = style;
            }
          }
          return style;
        }
      });

    } else {
      markerLayer = new VectorLayer({
        source: vectorSource,
      });
    }
    markerLayer.setZIndex(3);



    // var baseLayer = commonFactory
    //     .layer(rootScopeVal.LoginDatas.mapView);


    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [],
        projection: 'EPSG:4326'
      }),
      style: new Style({
        fill: new Fill({
          color: 'rgba(255, 255, 255, 0.5)'
        }),
        stroke: new Stroke({
          color: 'green',
          width: 3
        })
      })
    });

    vectorLayer.setZIndex(2);

    const tileLayer = new TileLayer({
      source: new XYZ({
        //url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        //url:'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}',
        url: 'https://mt{0-3}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      })
    });
    tileLayer.setVisible(true);

    const satelliteLayer = new TileLayer(
      {
        source: new XYZ(
          {
            url: 'http://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}'
          }),
      });
    satelliteLayer.setVisible(false);


    this.map = new Map({
      target: map,
      layers: [tileLayer, markerLayer, vectorLayer, satelliteLayer],
      view: new View({
        center: [latLng.lng, latLng.lat],
        zoom: 15
      })
      // ,
      // controls : olControl.defaults({
      //   attribution : false
      // })
    });
    if (clickEvent) {
      this.map.on('click', (evt) => {
        var feature = this.map.getLayers().item(1).getSource().getClosestFeatureToCoordinate(evt.coordinate);
        if (feature.values_.features.length > 1) {
          var extent = new createEmpty();
          feature.values_.features.forEach(function (feature) {
            new extend(extent, feature.getGeometry().getExtent());
          });
          this.map.getView().fit(extent, { duration: 2000 });
        } else {
          var fet = feature.get('features')[0]["values_"]["name"];
          clickEvent(fet);

          // document.getElementById('popup').innerHTML ="Plate Number : "
          // +fet.values_.name.plateNo
          // +"<br>"
          // + "Status " + fet.values_.name.status;
          // var popup = new Overlay({
          //   element: document.getElementById('popup')
          // });
          // popup.setPosition(evt.coordinate);
          // this.map.addOverlay(popup);
        }

      })
    }

    return this.map;
  }
  addMarker(map: any, latLng: coordinates, id: string, image: string) {
    const feature = new olFeature(
      {
        geometry: new Point(fromLonLat([latLng.lng, latLng.lat, 'EPSG:4326', 'EPSG:3857'])),
        name: 'contentString',
        title: 'fddf'
      });
    feature.setStyle([new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 1,
        crossOrigin: 'anonymous',
        src: image
      }))
    })]);

    if (id != null) {
      feature.setId(id);
    }
    this.map.getLayers().item(1).getSource().addFeature(
      feature);
    if (id != 'addGeoZone' && id != 'livetrack') {
      this.setCenter(this.map, latLng);
    }

  }

  addMarkerWithInfoWindow(map: any, latLng: coordinates, contentString: object, icon: string) {
    var feature = new olFeature({
      geometry: new Point(fromLonLat([latLng.lng, latLng.lat, 'EPSG:4326', 'EPSG:3857'])),
      name: contentString,
      title: 'lineString'
    });
    feature.setStyle([new Style({
      image: new Icon(({
        anchor: [0.5, 1],
        anchorXUnits: 'fraction',
        anchorYUnits: 'fraction',
        opacity: 1,
        crossOrigin: 'anonymous',
        src: icon
      }))
    })]);

   this.map.getLayers().item(1).getSource().addFeature(feature);
    // this.setCenter(map, latLng);
  }

  addClusteringMarkers(map: any, latLng: any, contentString: any) {
    var feature = new olFeature({
      geometry: new Point(fromLonLat([latLng.lng, latLng.lat, 'EPSG:4326', 'EPSG:3857'])),
      name: contentString,
      title: 'mapView'
    });
    map.getLayers().item(1).getSource().getSource().addFeature(feature);
  }
  
  clearClusteringMarkers(map: any, data: any) {
    for (var i = 0; i < data.length; i++) {
      map.getLayers().item(data[i]).getSource().getSource().clear();
    }
  }
  setCenter(map: any, latLng: coordinates) {
    map.getView().setCenter(
      fromLonLat([latLng.lng, latLng.lat]));
  }

  clearLayers(map: any, data: any) {
    for (var i = 0; i < data.length; i++) {
      map.getLayers().item(data[i]).getSource().clear();
    }
  }

  moveMarker(map: any, id: String, lon: number, lat: number, image: String, content: String, lineStringArray: coordinates[]) {
    if(map){
    let feature = map.getLayers().item(1).getSource()
      .getFeatureById(id);
    if (feature != null) {
      feature.setGeometry(new Point(fromLonLat([lon, lat])));
      feature.setStyle(new Style({
        image: new Icon(({
          anchor: [0.5, 1],
          anchorXUnits: 'fraction',
          anchorYUnits: 'fraction',
          opacity: 1,
          crossOrigin: 'anonymous',
          src: image
        })),
        // text : new Style({
        //   offsetY : -85,
        //   text : content,
        //   font : '10px Open Sans,sans-serif',
        //   fill : new Fill({
        //     color : '#111'
        //   }),
        //   stroke : new Stroke({
        //     color : '#eee',
        //     width : 2
        //   }),
        //   backgroundFill : new Fill({
        //     color : 'white'
        //   })
        // }),

      }));
    

    const extent = map.getView().calculateExtent(map.getSize());
    //const extent2 = (feature.getGeometry())
    const extent2 = feature.getGeometry().getExtent();
    const containsMapWithinBounds = containsExtent(extent, extent2);
    if (!containsMapWithinBounds) {
      map.getView().setCenter(
        fromLonLat([lon, lat]));
    }
    this.createLine(map, lineStringArray);
    // else {
    // this.addMarker(id, lon, lat);
    // }
  }
  }
}

  createLine(map: any, coordinates: any) {
    var points = [];
    for (var i = 0; i < coordinates.length; i++) {
      points.push(fromLonLat([
        coordinates[i]['lng'],
        coordinates[i]['lat']]));
      // this.addMarker(map,coordinates[i],null,'assets/icon/idle.png')
    }

    var thing = new LineString(points);

    var styles = new Style({
      stroke: new Stroke({
        color: 'black',
        width: 3
      })
    });

    var featurething = new olFeature({
      name: "lineString",
      geometry: thing,
      duration: 1200,
      delay: 10000
    });
    featurething.setStyle(styles);

    map.getLayers().item(2).getSource()
      .addFeature(featurething);
    //this.fitbounds(map, 2);
    //this.setCenter(map, coordinates);
  }
  // createLineforBusStop(map: any, coordinates: any, image: string) {
  //   var points = [];
  //   for (var i = 0; i < coordinates.length; i++) {
  //     points.push(fromLonLat([
  //       coordinates[i]['lng'],
  //       coordinates[i]['lat']]));
  //     // this.addMarker(map,coordinates[i],null,'assets/icon/idle.png')
  //   }

  //   var thing = new LineString(points);

  //   var styles = new Style({
  //     stroke: new Stroke({
  //       color: 'black',
  //       width: 3,
  //       // image: new Icon(({
  //       //   anchor: [0.5, 1],
  //       //   anchorXUnits: 'fraction',
  //       //   anchorYUnits: 'fraction',
  //       //   opacity: 1,
  //       //   crossOrigin: 'anonymous',
  //       //   src: image
  //       // }))
  //     })
      
  //   });
  //   var featurething = new olFeature({
  //     name: "lineString",
  //     geometry: thing,
  //     duration: 1200,
  //     delay: 10000
  //   });
  //   featurething.setStyle(styles);

  //   map.getLayers().item(2).getSource()
  //     .addFeature(featurething);
  //   //this.fitbounds(map, 2);
  //   //this.setCenter(map, coordinates);
  // }

  fitBounds(map: any, item: any) {
    var extent = map.getLayers().item(item).getSource()
      .getExtent();
    if (extent[0] != 'Infinity' && extent[0] != '-Infinity')
      map.getView().fit(extent, {
        duration: 1000, maxZoom: 16
      });
  }

  fitBoundsForCluster(map: any) {
    var extent = map.getLayers().item(1).getSource().getSource()
      .getExtent();
    if (extent[0] != 'Infinity' && extent[0] != '-Infinity')
      map.getView().fit(extent, {
        duration: 1000, maxZoom: 16
      });
  }

  createCircle(map: any, latLng: coordinates, range: number, type: any) {
    var rootObj = this;
    let color = 'FF0000';
    this.circle = new Circle(fromLonLat([latLng.lng, latLng.lat]), range);
    if (type === 'Preferred') {
      color = '1eb15d';
    }
    var styles = new Style({
      stroke: new Stroke({
        color: '#' + color,
        width: 3
      }),
      fill: new Fill({
        color: '#' + color + '50',
      })
    });
    const featurething = new olFeature(this.circle);
    featurething.setStyle(styles);
    featurething.setId('circleZone');
    map.getLayers().item(2).getSource()
      .addFeature(featurething);
  }

  getRadius() {
    //  console.log('center', { lat: this.circle.getCenter().lat(), lng: this.circle.getCenter().lng()});
    return this.circle.getRadius();
  }

  getCircleCenter() {
    return this.circle.getCenter();
  }

  setCircleRadius(range: any) {
    if (this.circle != undefined || this.circle != null || this.circle == '') {
      this.circle.setRadius(range);
    }
  }

  updateCircle(latLng: coordinates) {
    this.circle.setCenter(fromLonLat([latLng.lat, latLng.lng]));
    // this.setCenter(map, latLng);
    let latLngBounds = this.circle.getBounds();
    latLngBounds = latLngBounds.getNorthEast().lat() + ','
      + latLngBounds.getNorthEast().lng() + '|' + latLngBounds.getSouthWest().lat()
      + ',' + latLngBounds.getSouthWest().lng();
    console.log('geobounds', latLngBounds);
  }

  removeMarkersById(map: any, id: string) {
    var deleteId = map.getLayers().item(1).getSource()
      .getFeatureById(id);
    if (deleteId != null) {
      map.getLayers().item(1).getSource().removeFeature(
        deleteId);
    }
  }

  circleGeoZone() {
    const feature = this.map.getLayers().item(2).getSource().getFeatureById('circleZone');
    const firstCoordinate = feature.getGeometry().getFirstCoordinate();
    const lastCoordinate = feature.getGeometry().getLastCoordinate();
    const firstLatLng = toLonLat([firstCoordinate[0], firstCoordinate[1]]);
    const lastLatLng = toLonLat([lastCoordinate[0], lastCoordinate[1]]);
    const geofence = firstLatLng[1] + ',' + firstLatLng[0] + '|' + lastLatLng[1] + ',' + lastLatLng[0];
    console.log(geofence);
    return geofence;
  }
}
