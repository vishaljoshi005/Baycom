import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {VerfiyEmailService} from '@/core/services/miscellaneous/verfiy-email.service';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.component.html',
  styleUrls: ['./verify-email.component.css']
})
export class VerifyEmailComponent implements OnInit {

  private verify = {
    userId: '',
    verificationToken: ''
  };

  private verficationSucessful: boolean;


  constructor(private route: ActivatedRoute, private router: Router, private verifyEmailService: VerfiyEmailService) {
    this.verficationSucessful = false;
    // this.snapshotParam = this.route.snapshot.paramMap.get('token');
    // console.log(this.snapshotParam);
  }

  ngOnInit() {
    this.verify.userId = this.route.snapshot.paramMap.get('id');
    this.verify.verificationToken = this.route.snapshot.paramMap.get('token');

    this.verifyEmailService.verifyEmail(this.verify)
      .subscribe((next) => {
        // test suceess then make verificationSucessful
        this.verficationSucessful = true;
        console.log('From the component');
      });

  }

}

// todo add flag and show according to the response from spring
// Create HTML content of this page
