import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authServ: AuthService
    ) {
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
            Validators.minLength(3)
          ]
        }
      )
    });
  }


  logIn() {
    this.form.invalid ? console.log('invalid') : this.authServ.login(this.form.value.email, this.form.value.password);
  }
}
