import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VerifyEmail} from '@/core/models/verifyEmailModel';
import {VerfiyEmailService} from '@/core/services/miscellaneous/verfiy-email.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  private verfiyData = VerifyEmail;

  private verify = {
    userName: '',
    verificationToken: ''
  };



  constructor(private route: ActivatedRoute, private router: Router, private verifyEmailService: VerfiyEmailService) {

    // this.snapshotParam = this.route.snapshot.paramMap.get('token');
    // console.log(this.snapshotParam);
  }

  ngOnInit() {
    this.verfiyData.username = this.route.snapshot.paramMap.get('id');
    this.verfiyData.verificationToken = this.route.snapshot.paramMap.get('token');

    this.verifyEmailService.verifyEmail(this.verfiyData)
      .subscribe((next) => {
        console.log('From the component');
      });

  }

}
