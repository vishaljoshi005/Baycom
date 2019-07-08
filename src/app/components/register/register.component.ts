import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {RegisterService} from '@/core/services/auth/register.service';
import {UserValidatorsService} from '@/core/services/validations/user-validators.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  RegisterForm: FormGroup;
  submitted: boolean;
  // Password Match Validator
  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (
      this.RegisterForm &&
      (control.value !== this.RegisterForm.controls.password.value)
    ) {
      return { passwordNotMatch: true };
    }
    return null;
  }

  constructor( private formBuilder: FormBuilder, private router: Router, private registerService: RegisterService, private userValidator: UserValidatorsService) { }

  ngOnInit() {
    this.RegisterForm = this.formBuilder.group({
      firstName: ['',  [Validators.required], [] ],
      lastName: ['',  [Validators.required], [] ],
      emailId: ['',  [Validators.required, Validators.email], [ this.userValidator.userEmailValidator()] ],
      phone: ['', [Validators.maxLength(15)]],
      userName: ['',  [Validators.required, Validators.pattern(/^[a-zA-Z0-9_]+$/)], [ this.userValidator.userNameValidator()] ],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['',  [Validators.required, this.passwordMatcher.bind(this)], [] ],
    });
  }
  get emailId() { return this.RegisterForm.get('emailId'); }
  get confirmPassword() { return this.RegisterForm.get('confirmPassword'); }
  get userName() { return this.RegisterForm.get('userName'); }



  private onSubmit() {
    // check if form is valid

    if (this.RegisterForm.valid) {
      this.registerService.register(this.RegisterForm.value).subscribe((data) => {
       if (data) {
         if (data.success) {
          console.log(data);
          this.submitted = true;
          // this.router.navigate(['/login']); // Change this URL
        } else {
          this.RegisterForm.reset();
        }}
      });

      this.RegisterForm.get('firstName').clearValidators();
      this.RegisterForm.get('lastName').clearValidators();
      this.RegisterForm.get('emailId').clearValidators();
      this.RegisterForm.get('phone').clearValidators();
      this.RegisterForm.get('userName').clearValidators();
      this.RegisterForm.get('password').clearValidators();
      this.RegisterForm.get('confirmPassword').clearValidators();
    } else {
      // Add some thing show invalid forms
      this.RegisterForm.reset();
    }

  }
}
