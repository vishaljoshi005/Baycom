import {Component, Inject, OnInit} from '@angular/core';
import {Form, FormBuilder, FormControl, FormGroup, NgForm, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef, MatSnackBar} from '@angular/material';
import {Router} from '@angular/router';
import {AuthService} from '@/core/services/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private dialog: MatDialog, private authenticationService: AuthService , private router: Router, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['',  [Validators.required], [] ],
      password: ['', [Validators.required]]
    });

    this.authenticationService.logout();
  }
  openSnackBar() {
    this.snackBar.open('Invalid Username or Password', 'Close', {
      duration: 2000,
      panelClass: ['style-success'],
    });
  }


  private onSubmit() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.loginForm.value).subscribe((data) => {
        if (data.success) {
          this.router.navigate(['/login']); // Change this URL
        } else {
          this.openSnackBar();
          this.loginForm.reset();
        }
      }, ( err ) => {

      });

      this.loginForm.get('username').clearValidators();
      this.loginForm.get('password').clearValidators();
    } else {
      // Add some thing
    }

  }

    private forgotDialog() {
      this.dialog.open( ForgotPasswordComponent , { disableClose: true,
        data: { name: 'austin' },
      });

      this.dialog.afterAllClosed.subscribe(result => {
        this.loginForm.reset();
      });
    }

}

@Component({
    selector: 'app-forgot-password',
    templateUrl: 'forgot-password.html',
    styleUrls: ['./forgot.component.css']
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
