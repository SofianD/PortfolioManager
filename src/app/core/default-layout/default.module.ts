import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HeaderComponent } from '../navigation/header/header.component';
import { DefaultLayoutComponent } from './default-layout.component';
import { DefaultRoutingModule } from './default-routing.module';
import { DashboardComponent } from '../page/dashboard/dashboard.component';
import { ProjectComponent } from '../page/project/project.component';
import { AngularMaterialModule } from 'src/app/shared/modules/angular-material/angular-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SkillComponent } from '../page/skill/skill.component';

@NgModule({
  declarations: [
    DefaultLayoutComponent,
    HeaderComponent,
    DashboardComponent,
    ProjectComponent,
    SkillComponent
  ],
  imports: [
    CommonModule,
    DefaultRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule
  ]
})
export class DefaultModule { }
