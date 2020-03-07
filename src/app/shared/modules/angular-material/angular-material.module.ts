import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule

  ]
})
export class AngularMaterialModule { }
