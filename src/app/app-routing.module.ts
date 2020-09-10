import { AuthGuardService } from './services/auth-guard.service';
import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
 
const routes: Routes = [
  { 
    path: '', 
    redirectTo: 'login', 
    pathMatch: 'full' 
  },
  {
    path: 'login',
    loadChildren:'./pages/login/login.module#loginPageModule',
  },
  {
    path: 'tabs',
    loadChildren:'./pages/tabs/tabs.module#TabsPageModule',
    canActivate: [AuthGuardService]
  }
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes , { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule]
})
export class AppRoutingModule { }