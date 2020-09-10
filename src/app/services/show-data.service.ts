import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import * as L from 'leaflet';


declare interface TableData {
  headerRow: any[];
  dataRows: any[][];
}

@Injectable({
     providedIn: 'root'
})

export class ShowDataService {

  url = environment.url;

  constructor(public http: HttpClient) {}

  public GlobalTable: TableData = {
    headerRow: [],
    dataRows: new Array()
  };

  public choice: any;

  //declaration of warning tables 
  public WaterTemperatureWarning = [];
  public FuelLevelWarning = [];
  public OilLevelWarning = [];
  public KeyBatteryWarning = []
 

  // declaration of show and hide boolean 
  showWaterTemperatureWarning = true;
  showFuelLevelWarning = true;
  showOilLevelWarning = true;
  showKeyBatteryWarning= true;

  displayData(data, mymap) {
    var tiles = L.tileLayer(environment.osmPath, {
      maxZoom: environment.maxZoom,
      attribution: environment.osmAttribution
    });
    mymap = L.map('map', {
      center: [environment.Lat, environment.Long],
      zoom: environment.Zoom,
      zoomControl: true, layers: [tiles]
    });
    for (var j = 0; j < data.length - 1; j++) {
      var pointA = new L.LatLng(Number(data[j][0]["gpsLatitude"]), Number(data[j][0]["gpsLongitude"]));
      var pointB = new L.LatLng(Number(data[j + 1][0]["gpsLatitude"]), Number(data[j + 1][0]["gpsLongitude"]));
      var pointList = [pointA, pointB];
      if (pointA != pointB) {
        var firstpolyline = new L.Polyline(pointList, {
          color: '#FF6949',
          weight: 3,
          opacity: 0,
          smoothFactor: 1
        }).addTo(mymap)
        var arrowHead = L.polylineDecorator(firstpolyline, {
          patterns: [
            {
              offset: 20,
              repeat: 0,
              symbol: L.Symbol.arrowHead({
                polygon: true,
                headAngle: 45,
                pixelSize: 20,
                pathOptions: {
                  color: '#FF6949',
                }
              })
            }
          ]
        }).addTo(mymap)
      }
    }
    mymap.setView([data[data.length - 1][0]["gpsLatitude"], data[data.length - 1][0]["gpsLongitude"]], 15)
    return mymap
  }

  showAndHideFuelLevelwarning(data, mymap) {
    if (this.showFuelLevelWarning) {
      this.FuelLevelWarning = []
      for (var j = 0; j < data.length; j++) {
        if (data[j][1]["fuelLevelWarning"] == 1) {
          var LeafIcon = L.Icon.extend({
            options: {
              iconUrl: environment.fuelIconPath,
              iconSize: environment.iconSize,
              iconAnchor: environment.iconAnchor,
              popupAnchor: environment.popupAnchor
            }
          });
          var marker = L.marker([Number(data[j][0]["gpsLatitude"]), Number(data[j][0]["gpsLongitude"])], {
            icon: new LeafIcon()
          }).addTo(mymap);
          this.FuelLevelWarning.push(marker)
        }
      }
      this.showFuelLevelWarning = false
    }
    else if (!this.showFuelLevelWarning) {
      for (var i = 0; i < this.FuelLevelWarning.length; i++) {
        this.FuelLevelWarning[i].remove()
      }
      this.showFuelLevelWarning = true
    }
    return mymap
  }

  showAndHideWaterTemperatureWarning(data, mymap) {
    if (this.showWaterTemperatureWarning) {
      this.WaterTemperatureWarning = []
      for (var j = 0; j < data.length; j++) {
        if (data[j][1]["waterTemperatureWarning"] == 1) {
          var LeafIcon = L.Icon.extend({
            options: {
              iconUrl: environment.waterTemperatureIconPath,
              iconSize: environment.iconSize,
              iconAnchor: environment.iconAnchor,
              popupAnchor: environment.popupAnchor
            }
          });
          var marker = L.marker([Number(data[j][0]["gpsLatitude"]), Number(data[j][0]["gpsLongitude"])], {
            icon: new LeafIcon()
          }).addTo(mymap);
          this.WaterTemperatureWarning.push(marker)
        }
      }
      this.showWaterTemperatureWarning = false
    }
    else if (!this.showWaterTemperatureWarning) {
      for (var i = 0; i < this.WaterTemperatureWarning.length; i++) {
        this.WaterTemperatureWarning[i].remove()
      }
      this.showWaterTemperatureWarning = true
    }
    return mymap
  }

  showAndHideOilLevelWarning(data, mymap) {
    if (this.showOilLevelWarning) {
      this.OilLevelWarning = []
      for (var j = 0; j < data.length; j++) {
        if (data[j][1]["oilLevelWarning"] == 1) {
          var LeafIcon = L.Icon.extend({
            options: {
              iconUrl: environment.oilIconPath,
              iconSize: environment.iconSize,
              iconAnchor: environment.iconAnchor,
              popupAnchor: environment.popupAnchor
            }
          });

          var marker = L.marker([Number(data[j][0]["gpsLatitude"]), Number(data[j][0]["gpsLongitude"])], {
            icon: new LeafIcon()
          }).addTo(mymap);
          this.OilLevelWarning.push(marker)
        }
      }
      this.showOilLevelWarning = false
    }
    else if (!this.showOilLevelWarning) {
      for (var i = 0; i < this.OilLevelWarning.length; i++) {
        this.OilLevelWarning[i].remove()
      }
      this.showOilLevelWarning = true
    }
    return mymap
  }

  showAndHideKeyBatteryWarning(data, mymap){}
}




