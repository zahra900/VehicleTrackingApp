# VehicleTrackingApp
Make sure that the server is running and that it is correctly connected to the database;
Get the project and run: `ionic serve -ssl` 

Run `ionic serve`. It will initialize the server at port 8200.

The project will be running at http://localhost:8101/webpack-dev-server/
First you should fill the credentials form then register or login if you are already registred.
Then, there will be three tabs: 
1. Logout tab : You can logout
2. Vehicules tab : You can add or delete your vehicules that will be tracked
3. Tracks tab : After identifying the period of tracking as well as the vehicule to track a map is displayed containing the tracks. In addition, you can click on fuel icon, Oil warning, KeyBatteryWarning or WaterTemperatureWarning to display related warnings in the map if they appeared during the trip related to the selected period.
