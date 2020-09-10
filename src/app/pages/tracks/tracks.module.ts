import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TracksPage } from './tracks.page';


import { TracksPageRoutingModule } from './tracks-routing.module';


@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    TracksPageRoutingModule
  ],
  declarations: [TracksPage]
})
export class TracksPageModule {}
