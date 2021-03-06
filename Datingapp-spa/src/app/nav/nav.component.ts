import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { retry } from 'rxjs/internal/operators/retry';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = [];



  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {

    this.authService.login(this.model).subscribe( next => {
     this.alertify.success('logged successfully');
    }, error => {
      // console.log('Failed to login');
      // console.log(error);
      this.alertify.error(error);
    }, () => {
      this.router.navigate(['/members']);
    });
  }

  loggedIn() {

    // const token = localStorage.getItem('token');
    return this.authService.loggedIn();

  }


  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['\home']);
    // console.log('logged out');
    this.alertify.message('logged out');
  }
}
