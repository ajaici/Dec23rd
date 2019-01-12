import { Component, OnInit } from '@angular/core';
import { Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  model: any = {};

  @Output() cancelRegister = new EventEmitter();

  constructor(private authService: AuthService, private alertify: AlertifyService) { }

  ngOnInit() {
  }

  register() {

    this.authService.register(this.model).subscribe(() => {
      this.alertify.success('Registration successful'); }, error => {
        this.alertify.error(error);
      });
  }

  cancel() {

    this.cancelRegister.emit(false);
    // console.log('cancelled');
  }


}
