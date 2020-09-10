import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HttpClientModule } from '@angular/common/http';
//We use ionic/storage to save the token 
import { Storage, IonicStorageModule } from '@ionic/Storage';

//We use angular-jwt to check if the token is duplicated and also automatically append the token 
//to any request of the angular http client
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';

//Function that gives reference to our own ionic storage  
export function jwtOptionsFactory(storage) {
  return {
    //Get the token from wherever it is stored
    tokenGetter: () => {
      return storage.get('access_token');
    },
    whitelistedDomains: ['localhost:8443']
  }
}


@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
     BrowserModule,
     IonicModule.forRoot(),
     AppRoutingModule,
     HttpClientModule,//To make any HTTP request 
     IonicStorageModule.forRoot(),
     JwtModule.forRoot({
        jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [Storage],//dependencies
      }
    })],

  providers: [
    StatusBar,
    SplashScreen,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
