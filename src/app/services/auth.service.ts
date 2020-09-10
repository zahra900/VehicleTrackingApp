import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AlertController, Platform } from '@ionic/angular';
import { JwtHelperService } from "@auth0/angular-jwt";
import { tap, catchError } from 'rxjs/operators';
import { Storage} from '@ionic/Storage';

//The key where our token will be stored
const TOKEN_KEY = 'access_token';
const USER_ID ='_id'

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  
  user = null;
  url = environment.url;
  authenticationState = new BehaviorSubject(false);
  
  constructor(private http: HttpClient, private helper: JwtHelperService,
              private storage: Storage,private plt: Platform, 
              private alertController: AlertController) {            
    this.plt.ready().then(() => {
      //Check if we have token stored previously
      this.checkToken();
    });
  }

  checkToken() {
    //get the token from the storage
    this.storage.get(TOKEN_KEY).then(token => {
    //if the token exists/ If not the user is not logged in
      if (token) {
        let isExpired = this.helper.isTokenExpired(token);
        if (!isExpired) {
          this.authenticationState.next(true);
        }else {
          //If it is expired we don't need it anymore
          this.storage.remove(TOKEN_KEY);
        }
      }
    });
  }

  register(credentials) {
    //we're expecting the server to return the new user)
    return this.http.post(`${this.url}/users`, credentials)
    .pipe(
      tap(res=>{
        this.storage.set(USER_ID, res['_id']);
      }),  
      catchError(e => {
        this.showAlert(e.error.msg);
        console.log(e)
        throw new Error(e);
      })
    );
  }
 
  login(credentials) {
    return this.http.post(`${this.url}/auth`, credentials)
      .pipe(
        tap(res => {
          console.log(res)
          //set the token to our storage
          this.storage.set(TOKEN_KEY, res['accessToken']);
          this.authenticationState.next(true);
        }),
        catchError(e => {
          this.showAlert(e.error.msg);
          throw new Error(e);
        })
      );
  }

  logout() {
    //remove the token from our storage
    this.storage.remove(TOKEN_KEY).then(() => {
      this.authenticationState.next(false);
    });
  }
 
  
  //current value of the authentication state
  isAuthenticated() {
    return this.authenticationState.value;
  }
 
  showAlert(msg) {
    let alert = this.alertController.create({
      message: msg,
      header: 'Error',
      buttons: ['OK']
    });
    alert.then(alert => alert.present());
  }

  loadUserID(credentials) {
    return this.http.get(`${this.url}/user`,credentials).pipe(
      catchError(e => {
        console.log(e.error.msg)
        throw new Error(e);
      })
    );
  }
  
}
