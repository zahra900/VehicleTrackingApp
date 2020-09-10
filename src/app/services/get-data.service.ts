import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';

const USER_ID="_id"

declare interface TableData {
  headerRow: any[];
  dataRows: any[][];
}

export interface Item{
  USER_ID: string,
}

@Injectable({
  providedIn: 'root'
})

export class GetDataService {

  url = environment.url;
  constructor(public http: HttpClient, private storage: Storage) {}

  public GlobalTable: TableData = {
    headerRow: [],
    dataRows: new Array()
  };

  public choice: any;
  public markerTrou = []

  getDataTracking(vin, D1, D2){
    return this.http.get(`${this.url}/Trackingdata`+'/' + vin +'/' +D1 +'/'+D2).pipe(
      catchError(e => {
        console.log(e.error.msg);
        throw new Error(e);
      })
    );
  }

  getDataJourney(vin, D1, D2){
    return this.http.get(`${this.url}/Journeydata`+'/' + vin +'/' +D1 +'/'+D2).pipe(
      catchError(e => {
        console.log(e.error.msg)
        throw new Error(e);
      })
    );
  }
 
  getDataStatus(vin, D1, D2){
    return this.http.get(`${this.url}/Statusdata`+'/' + vin +'/' +D1 +'/'+D2).pipe(
      catchError(e => {
        console.log(e.error.msg)
        throw new Error(e);
      })
    );
  }

  findVehicules(){
    return this.http.get(`${this.url}/Vehicules/`).pipe(
      catchError(e => {
        console.log(e.error.msg)
        throw new Error(e);
      })
    );
  }

  getUserID(){
    return this.storage.get(USER_ID)
  }

  RegroupData(trackingData,statusData){
    this.GlobalTable.dataRows = []
    for (var j = 0; j < trackingData.length; j++) {
      this.GlobalTable.dataRows[j] = [trackingData[j], {}, {}]
    }
    for(var j=0; j< trackingData.length; j++){
        this.GlobalTable.dataRows[j]= [trackingData[j],statusData[j],{}]
    }

    var tabint = []
    for (var j = 0; j < this.GlobalTable.dataRows.length; j++) {
      if (this.GlobalTable.dataRows[j][0]["gpsLatitude"] != undefined) {
        tabint.push(this.GlobalTable.dataRows[j])
      }
    }
    return tabint
  }

}
