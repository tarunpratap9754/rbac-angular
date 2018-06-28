import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Page } from './page';


import { map } from 'rxjs/operators';

@Injectable()
export class PageProvider {

    private pages: Page[] = [];

    constructor(private http: Http) {

    }

    public getPages(): Page[] {
        return this.pages;
    }

    load() {
        console.log("Loading Pages data from database.")
        return new Promise((resolve, reject) => {
            this.http
                .get('http://localhost:3000/api/pages')
                .pipe(map(res => res.json()))
                .subscribe(response => {
                    this.pages = response;
                    console.log("Page array loading complete")
                    resolve(true);
                })
        })
    }
}