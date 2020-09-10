import { Component, OnInit } from '@angular/core';
import 'leaflet-polylinedecorator';
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
import 'leaflet/dist/leaflet.css';
import { environment } from '../../../environments/environment';
import * as L from 'leaflet';

import { ShowDataService } from '../../services/show-data.service';
import { GetDataService } from 'src/app/services/get-data.service';

@Component({
  selector: 'app-tracks',
  templateUrl: './tracks.page.html',
  styleUrls: ['./tracks.page.scss']
})
export class TracksPage implements OnInit {
  constructor(private getService: GetDataService, private showService: ShowDataService) {}
  // Declarations 
  map: any;
  new_data: string;
  tableCar: any;
  MapCar: any;
  MapVin: any;
  MapJourney: any;
  MapStatus: any;
  MapTracking: any;
  choice: any;

  ngOnInit() {
    this.MapTracking = new Map()
    this.MapStatus = new Map()
    this.MapJourney = new Map()
    this.MapCar = new Map()
    this.MapVin = new Map()
    var tiles = L.tileLayer(environment.osmPath, {
      maxZoom: environment.maxZoom,
      attribution: environment.osmAttribution
    });
    this.map = L.map('map', {
      center: [environment.Lat, environment.Long],
      zoom: environment.Zoom,
      zoomControl: true, layers: [tiles]
    });
  }
  //get vehicules available for tracking between two dates
  getVehicules() {
    this.tableCar = {}
    this.getService.findVehicules().subscribe(data => {
      this.new_data = JSON.stringify(data)
      this.tableCar = JSON.parse(this.new_data).result
    })
  }
  //get Data related to selected vehicules
  getData(choix) {
    if (choix.date1 && choix.date2) {
      this.getService.getDataTracking(choix.vins, choix.date1, choix.date2).subscribe(dataTracking => {
        if (dataTracking) {
          this.MapTracking.set(choix.vins, dataTracking)
          this.getService.getDataStatus(choix.vins, choix.date1, choix.date2).subscribe(dataStatus => {
            if (dataStatus) {
              this.MapStatus.set(choix.vins, dataStatus)
              this.getService.getDataJourney(choix.vins, choix.date1, choix.date2).subscribe(dataJourney => {
                if (dataJourney) {
                  this.MapJourney.set(choix.vins, dataJourney)
                  this.RegroupAndShowData(choix)
                }
              })
            }
          })
        }
      })
    }
    else {
      this.RegroupAndShowData(choix)
    }
  }
  // Regroup tracking and warnings related to selected vehicules
  RegroupAndShowData(choix) {
    var groupedData = []
    groupedData = this.getService.RegroupData(this.MapTracking.get(choix.vins).result, this.MapStatus.get(choix.vins).result)
    console.log(groupedData)
    this.MapTracking.set(choix.vins, groupedData)
    if (this.MapTracking.get(choix.vins).length > 0) {
      this.displayOnTheMap(choix)
    }
    this.choice = choix
  }

  // Show data related to selected vehicules  
  displayOnTheMap(choix) {
    this.map=this.showService.displayData(this.MapTracking.get(choix.vins), this.map)
  }

  // Show warnings detected while tracking selected vehicules 
  showAndHideFuelLevelwarning() {
    this.map=this.showService.showAndHideFuelLevelwarning(this.MapTracking.get(this.choice.vins), this.map)
  }
  showAndHideOilLevelWarning() {
    this.map=this.showService.showAndHideOilLevelWarning(this.MapTracking.get(this.choice.vins), this.map)
  }
  showAndHideKeyBatteryWarning() {
    this.map=this.showService.showAndHideKeyBatteryWarning(this.MapTracking.get(this.choice.vins), this.map)
  }

  showAndHideWaterTemperatureWarning() {
    this.map=this.showService.showAndHideWaterTemperatureWarning(this.MapTracking.get(this.choice.vins), this.map)
  }
}
