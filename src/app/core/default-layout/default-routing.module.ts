import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './default-layout.component';
import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { DashboardComponent } from '../page/dashboard/dashboard.component';
import { ProjectComponent } from '../page/project/project.component';
import { SkillComponent } from '../page/skill/skill.component';


const routes: Routes = [
  {
    path: '',
    component: DefaultLayoutComponent,
    // canActivateChild: [AuthGuard],
    children : [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'project',
        component: ProjectComponent
      },
      {
        path: 'skill',
        component: SkillComponent
      }
    ]
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DefaultRoutingModule { }
