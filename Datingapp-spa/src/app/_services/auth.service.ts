import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  baseUrl = 'http://localhost:5000/api/auth/';

  jwtHelper = new JwtHelperService();
  decodedToken: any;

constructor(private http: HttpClient) { }

login(model: any) {

 return this.http.post(this.baseUrl + 'login', {username: model.username, password: model.password})
 .pipe(

    map((response: any) => {

      const user = response;

      if (user) {
        localStorage.setItem('token', user.token);
        this.decodedToken = this.jwtHelper.decodeToken(user.token);
        console.log(this.decodedToken);
      }
    })
  );

}


register(model: any) {

return this.http.post(this.baseUrl + 'register', {username: model.username, password: model.password});

}

loggedIn() {

  const token = localStorage.getItem('token');

  return !this.jwtHelper.isTokenExpired(token);
}
}
