import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { TextInputModule } from 'ng-devui/text-input';
import { FormModule } from 'ng-devui/form';
import { ButtonModule } from 'ng-devui/button';

import { LoginComponent } from '@user/login/login.component';
import { LoginRoutingModule } from './login-routing.module';

const DEVUI = [
  TextInputModule,
  FormModule,
  ButtonModule
];



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    LoginRoutingModule,
    ...DEVUI
  ]
})
export class LoginModule { }
