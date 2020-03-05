import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../navigation/header/header.component';
import { DefaultLayoutComponent } from './default-layout.component';
import { DefaultRoutingModule } from './default-routing.module';
import { DashboardComponent } from '../page/dashboard/dashboard.component';
import { ProjectComponent } from '../page/project/project.component';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    HeaderComponent,
    DashboardComponent,
    ProjectComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule
  ]
})
export class DefaultModule { }
