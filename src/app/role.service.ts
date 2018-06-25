import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Role } from './role';

import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http: Http) { }

  addRole(newRole){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');

    return this.http.post('http://localhost:3000/api/roles/', newRole, {headers:headers})
      .pipe(map(res => res.json()));
  }

  getRoles(){
    return this.http.get('http://localhost:3000/api/roles')
      .pipe(map(res => res.json()));
  }
}
