import { Injectable } from '@angular/core';
import { Http, Headers, Response} from '@angular/http';
import { Country } from './country';

import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DropdownService {

  constructor(private http: Http) { }

  getCountries(){
    return this.http.get('http://localhost:3000/api/countries/all')
      .pipe(map(res => res.json()));
  }

  getStates(cName){
    return this.http.get('http://localhost:3000/api/countries/'+cName)
      .pipe(map(res => res.json()));
  }

  getCities(cName, sName){
    return this.http.get('http://localhost:3000/api/countries/'+cName+'/'+sName)
      .pipe(map(res => res.json()));
  }
}
