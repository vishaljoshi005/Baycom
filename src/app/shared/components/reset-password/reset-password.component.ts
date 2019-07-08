import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ForgotPasswordService} from '@/core/services/miscellaneous/forgot-password.service';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})

export class ResetPasswordComponent implements OnInit {
  private tokenMatched: boolean;
  private verify = {
    userId: '',
    token: '',
    password: ''
  };

  private resetForm: FormGroup;

  // Password Match Validator
  private passwordMatcher(control: FormControl): { [s: string]: boolean } {
    if (this.resetForm && (control.value !== this.resetForm.controls.password.value) ) {
      return { passwordNotMatch: true };
    }
    return null;
  }


  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, private forgotPassword: ForgotPasswordService) {
    this.tokenMatched = false;

    // this.snapshotParam = this.route.snapshot.paramMap.get('token');
    // console.log(this.snapshotParam);
    // Add validators

    this.resetForm = this.formBuilder.group({
      password: ['',  [Validators.required], [] ],
      confirmPassword: ['', [Validators.required, , this.passwordMatcher.bind(this)]]
    });
  }

  ngOnInit() {
    this.verify.userId = this.route.snapshot.paramMap.get('id');
    this.verify.token = this.route.snapshot.paramMap.get('token');

    this.forgotPassword.checkToken(this.verify)
      .subscribe((next) => {
        this.tokenMatched = true;
        console.log('From the component');
      });

  }

  private onSubmit() {
    if (this.resetForm.valid) {
      this.verify.password = this.resetForm.get('password').value;
      this.forgotPassword.resetPassword(this.verify).subscribe((data) => {
        console.log('From the component' + data);
        console.log(data);
        if (data.success) {
          this.router.navigate(['/login']); // Change this URL
        } else {
          this.resetForm.reset();
        }
      });

      this.resetForm.get('confirmPassword').clearValidators();
      this.resetForm.get('password').clearValidators();
    } else {
      // Add some thing
    }

  }

}
