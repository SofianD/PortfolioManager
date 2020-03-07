import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project/project.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  mode = 'overview';

  projects: [] = [];

  constructor(
    private projectService: ProjectService
  ) { }

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    try {
      this.getAllProjects();
    } catch (error) {
      console.log(error);
    }
  }

  changePageMode(str: string) {
    this.mode = str;
  }

  /////////////////////////////////////////////////////////////////////
  ////  SERVICE FUNCTIONS
  async getAllProjects() {
    try {
    (await this.projectService.getAllProjects()).subscribe(res => {
      this.projects = res.projects;
    });
    } catch (error) {
      console.log(error);
    }
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
