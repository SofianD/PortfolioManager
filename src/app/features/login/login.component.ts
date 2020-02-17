import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
  }

  buildForm() {
    this.form = this.fb.group({
      email: new FormControl(
        null,
        {
          validators: [
            Validators.required,
            Validators.email
          ]
        }
      ),
      password: new FormControl(
        null,
        {
          validators: [
            Validators.required,
            Validators.minLength(6)
          ]
        }
      )
    });
  }


  logIn() {

  }
}
