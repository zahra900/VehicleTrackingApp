import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VehiculesPage } from './vehicules.page';

const routes: Routes = [
  {
    path: '',
    component: VehiculesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VehiculesPageRoutingModule {}
