import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { User } from './user';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: Http) { }

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
}
