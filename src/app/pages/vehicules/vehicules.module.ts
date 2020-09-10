import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule , ReactiveFormsModule} from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { VehiculesPageRoutingModule } from './vehicules-routing.module';

import { VehiculesPage } from './vehicules.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    VehiculesPageRoutingModule
  ],
  declarations: [VehiculesPage]
})
export class VehiculesPageModule {}
