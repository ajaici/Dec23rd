import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
/**
 *
 */
constructor(private authService: AuthService, private router: Router, private alertify: AlertifyService) {
}

  canActivate(): boolean {

   if (this.authService.loggedIn()) {
    return true;
   }
   this.alertify.error('You shall no pass!!! Please login');
   this.router.navigate(['/home']);
   return false;
  }
}
