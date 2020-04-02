import { Component, OnInit } from '@angular/core';
import { ProjectService } from 'src/app/shared/services/project/project.service';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { SkillService } from 'src/app/shared/services/skill/skill.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css']
})
export class ProjectComponent implements OnInit {


  dateNow = Date.now();
  projects: any[] = [];
  skills: any[] = [];
  frameworks: any[] = [];
  platforms: any[] = [];

  // define the view
  mode = 'overview';

  form: FormGroup;
  submitted: boolean = false;

  //image preview
  imagePicked: string = '';
  imageName: string = '';
  imageDescription: string = '';

  // angular-editor config
  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Project description...*',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    showToolbar: true,
    toolbarHiddenButtons: [
      [
        'indent',
        'outdent',
        'heading',
        'justifyLeft',
        'justifyCenter',
        'justifyRight',
        'justifyFull',
        'fontName'
      ],
      [
        'fontSize',
        'textColor',
        'backgroundColor',
        'customClasses',
        'link',
        'unlink',
        'insertImage',
        'insertVideo',
        'insertHorizontalRule',
        'removeFormat',
        'toggleEditorMode'
      ]
    ]
  }

  constructor(
    private projectService: ProjectService,
    private skillService: SkillService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.initialize();
  }

  initialize() {
    try {
      this.getAllProjects();
      this.getSkills();
      this.getFrameworks();
      this.getPlatfortms();
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
      frameworks: this.fb.array([]),
      platforms: this.fb.array([])
    });
  }

  createItem(data): FormGroup {   // <- Use this function to push
    return this.fb.group(data);   //    an item into a form array
  }

  submitForm() {
    this.submitted = true;
    this.addSkills();
    if (this.form.invalid) {
      console.log(this.form.value);
      return;
    }
    this.addSkills();
    this.createProject({...this.form.value});
  }

  resetForm() {
    this.submitted = false;
    this.imagePicked = '';
    this.resetSkillsForms();
    this.resetSkillsArrays();
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
        id: Date.now().toString(),
        image,
        title,
        description
      }));
      this.resetNewImgForm();
      console.log(this.formImages.value);
    }
  }

  removeImg(image) {
    this.formImages.removeAt(this.formImages.value.indexOf(image));
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
  ////  SKILLS FUNCTIONS
  addSkills() {
    this.resetSkillsForms();
    const addedSkill = this.skills.filter(x => x.checked === true);
    const addedFW = this.frameworks.filter(x => x.checked === true);
    const addedPlatform = this.platforms.filter(x => x.checked === true);

    if (addedSkill.length > 0) addedSkill.map(x => this.formSkills.push(this.createItem({id: x._id})));
    
    if (addedFW.length > 0) addedFW.map(x => this.formFrameworks.push(this.createItem({id: x._id})));

    if (addedPlatform.length > 0) addedPlatform.map(x => this.formPlatforms.push(this.createItem({id: x._id})));
  }

  resetSkillsForms() {
    while(this.formSkills.length > 0) {
      this.formSkills.removeAt(0);
    }
    while(this.formFrameworks.length > 0) {
      this.formFrameworks.removeAt(0);
    }
    while(this.formPlatforms.length > 0) {
      this.formPlatforms.removeAt(0);
    }
  }

  resetSkillsArrays() {
      this.skills = this.skills.map(skill => {return {...skill, checked: false}});
      this.frameworks = this.frameworks.map(fm => {return {...fm, checked: false}});
      this.platforms = this.platforms.map(platform => {return  {...platform, checked: false}});
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
      this.mode = 'overview';
      this.submitted = false;
      this.projects.push(res);
      this.resetSkillsForms();
      this.resetSkillsArrays();
      this.resetForm();
    });
  }

  async updateProject(id: string, project: any) {
    (await this.projectService.update(id, project)).subscribe(res => {
      console.log(res)
    });
  }

  async deleteProject(id: string) {
    (await this.projectService.delete(id)).subscribe(res => {
      for(let i = 0; i < this.projects.length; i++) {
        if(id === this.projects[i]._id) {
          this.projects.splice(i, 1);
        }
      }
    });
  }

  //// skills
  async getSkills() {
    (await this.skillService.getSkills()).subscribe(res => {
      this.skills = res.map(skill => {return {...skill, checked: false}});
    });
  }

  async getFrameworks() {
    (await this.skillService.getAllFm()).subscribe(res => {
      this.frameworks = res.map(fm => {return {...fm, checked: false}});
    });
  }

  async getPlatfortms() {
    (await this.skillService.getPlatforms()).subscribe(res => {
      this.platforms = res.map(platform => {return  {...platform, checked: false}});
    });
  }

  /////////////////////////////////////////////////////////////////////
  //// Getters:
  get formImages(): FormArray {
    return this.form.get('images') as FormArray;
  }

  get formSkills(): FormArray {
    return this.form.get('skills') as FormArray;
  }

  get formFrameworks(): FormArray {
    return this.form.get('frameworks') as FormArray;
  }

  get formPlatforms(): FormArray {
    return this.form.get('platforms') as FormArray;
  }
}
