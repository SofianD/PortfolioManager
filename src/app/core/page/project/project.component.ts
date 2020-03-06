import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
  }

  initialize() {

  }

  /////////////////////////////////////////////////////////////////////
  ////  BELOW ARE SERVICE FUNCTIONS
  async getAllProjects() {
    const response = await this.projectService.getAllProjects();
  }

  async getOneProject(id: string) {
    const response = await this.projectService.getOneProject(id);
  }

  async createProject(project: any) {
    const response = await this.projectService.create(project);
  }

  async updateProject(id: string, project: any) {
    const response = await this.projectService.update(id, project);
  }

  async delete(id: string) {
    const response = await this.projectService.delete(id);
  }
}
