import { Component, OnInit } from '@angular/core';
import { Item, GetDataService } from '../../services/get-data.service';
import { AddDataService} from '../../services/add-data.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
@Component({
  selector: 'app-vehicules',
  templateUrl: './vehicules.page.html',
  styleUrls: ['./vehicules.page.scss'],
  providers: [GetDataService, AddDataService]
})
export class VehiculesPage implements OnInit {

  items: Item[] = [];
  credentialsForm: FormGroup;
  vehicules: any;
  new_data: string;

  constructor(private getService: GetDataService, 
    private addService: AddDataService, 
    private formBuilder: FormBuilder) {}


  loadUserID() {
    this.getService.getUserID().then(items => {
      this.items = items;
    });
  }

  ngOnInit() {
    this.loadUserID()
    this.credentialsForm = this.formBuilder.group({
      VIN: ['', [Validators.required, Validators.minLength(17)]]
    });
    this.vehicules = []
    this.getService.findVehicules().subscribe(data => {
      this.new_data = JSON.stringify(data)
      this.vehicules = JSON.parse(this.new_data).result
    })
    
  }
  addVehicules() {
    this.vehicules.push(this.credentialsForm.value);
    this.addService.addVehicule(this.credentialsForm.value,this.items).subscribe();
  }
  
  deleteVehicule(index, vehicule) {
    this.vehicules.splice(index, 1);
    this.addService.deleteVehicule(vehicule).subscribe();
  }

}
