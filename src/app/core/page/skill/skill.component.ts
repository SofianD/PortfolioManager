import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { SkillService } from 'src/app/shared/services/skill/skill.service';

@Component({
  selector: 'app-skill',
  templateUrl: './skill.component.html',
  styleUrls: ['./skill.component.css']
})
export class SkillComponent implements OnInit {

  mode: string = 'overview';

  //Platform section
  platform: object[] = [];
  platformForm: FormGroup;

  //Framework section
  frameworks: object[] =[];
  frameworkForm: FormGroup;

  //Skill section
  skills: object[] =[];
  skillForm: FormGroup;

  constructor(
    private skillService: SkillService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.initialize()
  }

  async initialize() {
    this.newSkillForm();
    this.newFmForm();
    this.newPlatformForm();
    (await this.skillService.getSkills()).subscribe(res => {
      console.log(res);
      this.skills = res;
    });
  }

  changePageMode(string: string) {
    this.mode = string;
  }

  //////////////////////////////////////////////////////////////
  ////   SKILL SECTION
  newSkillForm() {
    this.skillForm = this.fb.group({
      name: new FormControl(
        null, {
          validators: [
            Validators.required
          ]
        }
      )
    })
  }

  async submitSkillForm() {
    if (this.skillForm.invalid) {
      console.log('error');
      return;
    }
    (await this.skillService.addSkill(this.skillForm.value)).subscribe(res =>{
      this.skills.push(res);
      this.mode='overview';
    });
  }

  resetSkillForm() {
    this.skillForm.reset()
  }

  async deleteSkill(id:string) {
    (await this.skillService.deleteSkill(id)).subscribe(res => {
      this.skills = this.skills.filter(x => x._id !== id);
    });
  }

  //////////////////////////////////////////////////////////////
  ////   FRAMEWORK SECTION
  newFmForm() {
    this.frameworkForm = this.fb.group({
      name: new FormControl(
        null, {
          validators: [
            Validators.required
          ]
        }
      ),
      skill_id: new FormControl(
        null, {
          validators: [
            Validators.required
          ]
        }
      )
    })
  }

  async submitFmForm() {
    if (this.frameworkForm.invalid) {
      console.log('error');
      console.log(this.frameworkForm.value);
      return;
    }
    (await this.skillService.addFm(this.frameworkForm.value)).subscribe(res => {
      this.frameworks.push(res);
      this.mode='overview';
    });
  }

  resetFmForm() {
    this.frameworkForm.reset()
  }


  //////////////////////////////////////////////////////////////
  ////   PLATFORM SECTION
  newPlatformForm() {
    this.platformForm = this.fb.group({
      name: new FormControl(
        null, {
          validators: [
            Validators.required
          ]
        }
      )
    });
  }

  submitPlatformForm() {
    if (this.platformForm.invalid) {
      console.log('error');
      console.log(this.platformForm.value);
      return;
    }
    console.log('Ok');
    console.log(this.platformForm.value);
  }

  resetPlatformForm() {
    this.platformForm.reset()
  }

}
