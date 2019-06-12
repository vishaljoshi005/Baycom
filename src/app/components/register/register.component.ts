import { Component, OnInit } from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UniqueAlterEgoValidator} from '@/core/validators/user-validators.directive';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private alterEgoValidator: UniqueAlterEgoValidator) { }

  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      firstName: ['',  [Validators.required], [] ],
      lastName: ['',  [Validators.required], [] ],
      email: ['',  [Validators.required, Validators.email], [ this.alterEgoValidator.validate.bind(this.alterEgoValidator)] ],
      phone: ['', []],
      userName: ['',  [Validators.required], [] ],
      password: ['', [Validators.required]],
      confirmPassword: ['',  [Validators.required], [] ],
    });
  }
  get email() { return this.RegisterForm.get('email'); }

  private onSubmit() {
  }
}
