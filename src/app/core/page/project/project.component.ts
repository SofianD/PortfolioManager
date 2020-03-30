import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  dateNow = Date.now();
  projects: any[] = [];

  // define the view
  mode = 'overview';

  form: FormGroup;
  submitted: boolean = false;

  //image preview
  imagePicked: string = '';
  imageName: string = '';
  imageDescription: string = '';

  constructor(
    private projectService: ProjectService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    try {
      this.getAllProjects();
      this.newForm();
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
      framework: this.fb.array([]),
      platform: this.fb.array([])
    });
  }

  createItem(data): FormGroup {   // <- Use this function to push
    return this.fb.group(data);   //    an item into a form array
  }

  submitForm() {
    this.submitted = true;
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }
    this.createProject({...this.form.value});
  }

  resetForm() {
    this.submitted = false;
    this.imagePicked = '';
    this.form.reset();
  }


  /////////////////////////////////////////////////////////////////////
  ////  IMAGE FUNCTIONS
  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    !this.checkFileType(file.name.split('.')[file.name.split('.').length - 1]) ?
    console.log('Wrong') :
    this.setupImgPreview(file);
  }

  checkFileType(type: string) {
    const validTypes = ['jpg', 'jpeg', 'png'];
    return validTypes.includes(type.toLowerCase()) ? true : false;
  }
  
  setupImgPreview(file: File) {
    const reader = new FileReader();
    reader.onload = (e) => {
      this.imagePicked = reader.result.toString();
    };
    reader.readAsDataURL(file);
  }
  
  addImageInForm() {
    const image = this.imagePicked;
    const title = this.imageName;
    const description = this.imageDescription;
    if(image.length > 0 && title.length > 0 && description.length > 0) {
      this.formImages.push(this.createItem({
        id: this.formImages.length + 1,
        image,
        title,
        description
      }));
      this.resetNewImgForm();
      console.log(this.formImages.value);
    }
  }

  resetNewImgForm() {
    this.imagePicked = '';
    this.imageName = '';
    this.imageDescription = '';
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
    response.subscribe(res => {
      this.projects.push(res);
      this.resetForm();
      this.mode = 'overview';
    });
  }

  async updateProject(id: string, project: any) {
    const response = await this.projectService.update(id, project);
  }

  async delete(id: string) {
    const response = await this.projectService.delete(id);
  }


  //////////////////////////////
  //// Getters:
  get formImages(): FormArray {
    return this.form.get('images') as FormArray;
  }

}
