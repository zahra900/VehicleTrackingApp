import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { loginPage } from './login.page';


import { loginPageRoutingModule } from './login-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    loginPageRoutingModule
  ],
  declarations: [loginPage]
})
export class loginPageModule {}
