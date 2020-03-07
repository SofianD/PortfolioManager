import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {

  // define the view
  mode = 'overview';

  // declare form of type FormGroup
  form: FormGroup;
  submitted = false;

  projects: [] = [];

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
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


  /////////////////////////////////////////////////////////////////////
  ////  FORM FUNCTIONS
  newForm() {
    this.form = this.fb.group({
      name: new FormControl(
        null,
        {
          validators: [
            Validators.required,
            Validators.minLength(5)
          ]
        }
      ),
      created_date: new FormControl(
        null,
        {
          validators: [
            Validators.required
          ]
        }
      ),
      description: new FormControl(
        null,
        {
          validators: [
            Validators.required,
            Validators.minLength(15)
          ]
        }
      ),
      images: this.fb.array([]),
      skills: this.fb.array([]),
      framework: this.fb.array([])
    });
  }

  createItem(data): FormGroup {   // <- Use this function to push
    return this.fb.group(data);   //    an item into a form array
  }


  /////////////////////////////////////////////////////////////////////
  ////  VIEW FUNCTIONS
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
