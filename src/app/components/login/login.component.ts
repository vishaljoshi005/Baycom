import {Component, Inject, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material';
import {Router} from '@angular/router';
import {LoginService} from '../../core/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    username: ['',  [Validators.required], [] ],
    password: ['', [Validators.required]]
  });

  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private loginService: LoginService , private router: Router) { }

  ngOnInit() {
    this.loginForm.valueChanges.subscribe((objects => {
      // console.log(objects.userName);
    }));
  }

  private onSubmit() {
     console.log(this.loginForm.value);
     this.loginService.login(this.loginForm.value).subscribe((data) => {
      // console.log(data);
       if (data.headers) {
         console.log(data.headers.get('Authorization'));
         this.router.navigateByUrl('/page');
       } else {
         console.log('Incorrect Password');
       }
     }, ( err ) => {
       console.log(err);
     })
     this.loginForm.get('username').clearValidators();
     this.loginForm.get('password').clearValidators();
    // this.loginForm.reset();
  }

    private forgotDialog() {
      this.dialog.open(ForgotPasswordComponent, { disableClose: true,
        data: { name: 'austin' },
      });

      this.dialog.afterAllClosed.subscribe(result => {
        // console.log(`Dialog result: ${result}`); // Pizza!
        this.loginForm.reset();
      });
    }

}

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgot-password.html',
  })
  export class ForgotPasswordComponent {
  submitted = false;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              public dialogRef: MatDialogRef<ForgotPasswordComponent>,
              private router: Router) {
    }

   onSubmitEmail(form: NgForm) {
    // console.log(form.value.emailPass);
    this.submitted = true;

   }

   closeDialog() {
     this.router.navigateByUrl('/login').finally(() => {
       this.dialogRef.close('closed');
     });

   }

}
