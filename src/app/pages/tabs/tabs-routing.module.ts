import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'logout',
        loadChildren: () => import('../login/login.module').then(m => m.loginPageModule)
      },
      {
        path: 'tracks',
        loadChildren: () => import('../tracks/tracks.module').then(m => m.TracksPageModule)
      },
      {
        path: 'vehicules',
        loadChildren: () => import('../vehicules/vehicules.module').then(m => m.VehiculesPageModule)
      },
      {
        path: '',
        redirectTo: '/tabs/tracks',
        pathMatch: 'full'
      }
    ]
  },
  {
      path: '',
      redirectTo: '/tabs/tracks',
      pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class TabsPageRoutingModule {}

