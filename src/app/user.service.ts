import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from './user';
import { FlashMessagesService } from 'angular2-flash-messages';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(
    private http: Http,
    public jwtHelper: JwtHelperService,
    private flashMessage: FlashMessagesService) { }

  getUsers(){
    return this.http.get('http://localhost:3000/api/users')
      .pipe(map(res => res.json()));
  }

  addUser(newUser){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/users/', newUser, {headers:headers})
      .pipe(map(res => res.json()));
  }

  updateUser(newUser){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.put('http://localhost:3000/api/users/'+newUser._id, newUser, {headers:headers})
      .pipe(map(res => res.json()));
  }

  deleteUser(id){
    return this.http.delete('http://localhost:3000/api/users/'+id)
      .pipe(map(res => res.json()));
  }

  authenticateUser(user){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/authenticate/', user, {headers:headers})
      .pipe(map(res => res.json()));
  }

  authToken
  user

  storeUserData(token, user){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));

    this.authToken = token;
    this.user = user;
  }

  getProfile(){
    var headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');

    return this.http.get('http://localhost:3000/api/profile/', {headers:headers})
      .pipe(map(res => res.json()));
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loggedIn(){
    return this.jwtHelper.isTokenExpired();
  }

  logout(){

    this.flashMessage.show('You have been logged out.', {
      cssClass: 'card text-white bg-dark h5 ht text-center',
      timeout: 2000});

    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }
}
