import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { retry } from 'rxjs/internal/operators/retry';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = [];



  constructor(private authService: AuthService) { }

  ngOnInit() {
  }

  login() {

    this.authService.login(this.model).subscribe( next => {
      console.log('logged successfully');
    }, error => {
      // console.log('Failed to login');
      console.log(error);
    });
  }

  loggedIn() {

    const token = localStorage.getItem('token');
    return !!token;

  }


  logout() {
    localStorage.removeItem('token');
    console.log('logged out');
  }
}
