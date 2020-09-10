import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Storage } from '@ionic/storage';
import { environment } from '../../environments/environment';
import { tap, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddDataService {
  url = environment.url;
  USER_ID = ""
  constructor(public http: HttpClient, private storage: Storage) { }


  addVehicule(vehiculeData,USER_ID) {
    return this.http.post(`${this.url}/Vehicule/`+ USER_ID, vehiculeData).pipe(
       tap(res => {
         console.log(res);
       }),
       catchError(e => {
         console.log(e.error.msg)
         throw new Error(e);
       })
     );
  }

  deleteVehicule(vehicule) {
    return this.http.delete(`${this.url}/Vehicule/` + vehicule)
      .pipe(
        tap(res => {
          console.log(res);
        }),
        catchError(e => {
          console.log(e.error.msg)
          throw new Error(e);
        })
      );
  }

}
