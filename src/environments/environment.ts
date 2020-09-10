// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  url: 'https://localhost:8443',//In our case the server should run exactly there,

  osmPath: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  Lat: 48.852969,
  Long: 2.349903,
  Zoom: 11,
  minZoom: 1,
  maxZoom: 20,
  osmAttribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  fuelIconPath: '../../../assets/img/fuel.png',
  oilIconPath: '../../../assets/img/oil.png',
  batteryIconPath:'../../../assets/img/battery.png',
  waterTemperatureIconPath: '../../../assets/img/engine-coolant.png',
  popupAnchor:[-3, -76],
  iconSize: [30, 30],
  iconAnchor: [30, 30],
  
};
/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
