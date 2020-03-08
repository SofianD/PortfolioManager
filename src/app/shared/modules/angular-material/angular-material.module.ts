import { NgModule } from '@angular/core';
import {
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatListModule,
  MatSelectModule
} from '@angular/material';

@NgModule({
  exports: [
    MatInputModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatListModule,
    MatSelectModule
  ]
})
export class AngularMaterialModule { }
