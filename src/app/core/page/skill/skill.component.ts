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
  platform: [] =[];
  platformForm: FormGroup;

  //Framework section
  frameworks: [] =[];
  frameworkForm: FormGroup;

  //Skill section
  skills: [] =[];
  skillForm: FormGroup;

  constructor(
    private skillService: SkillService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.newSkillForm();
    this.newFmForm();
    this.newPlatformForm();
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
      // this.skills.push(res.skill);
      console.log(res);
    });
  }

  resetSkillForm() {
    this.skillForm.reset()
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
      )
    })
  }

  submitFmForm() {
    if (this.frameworkForm.invalid) {
      console.log('error');
      return;
    }
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
    })
  }

  submitPlatformForm() {
    if (this.platformForm.invalid) {
      console.log('error');
      return;
    }
  }

  resetPlatformForm() {
    this.platformForm.reset()
  }

}
