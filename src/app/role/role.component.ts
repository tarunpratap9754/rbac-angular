import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { FormArray, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RoleService } from '../role.service';
import { PageProvider } from '../page-provider';
import { Page } from '../page';

import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  pages: Page[] = []

  constructor(
    private roleService: RoleService,
    private pageProvider: PageProvider,
    private flashMessage: FlashMessagesService) {

  }

  rolename

  ngOnInit() {
    this.newForm();
  }

  buildScreens() {
    this.pages = this.pageProvider.getPages();

    const arr = this.pages.map(screen => {
      return new FormGroup({
        name: new FormControl(screen.description),
        access: new FormControl(false)
      })
    });
    return new FormArray(arr, [this.checkOne]);
  }

  form
  newForm() {
    this.form = new FormGroup({
      rolename: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
      description: new FormControl('This role describes a Client.', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
      screens: this.buildScreens()
    });
  }

  checkOne(control: FormArray) {
    var input = control.value
    for (var i = 0; i < control.length; i++) {
      var status = status || input[i].access
    }
    if (status == false) {
      return {
        checkList: {
          checkOne: status
        }
      }
    }
    else {
      return null
    }
  }

  addRole(form) {
    var arr = [];
    var scr = [];

    for (let obj of this.form.value.screens) {
      if (obj.access === true) {
        arr.push(obj.name)
      }
    }

    for (let page of this.pages) {
      for (let a of arr) {
        if (page.description === a) {
          scr.push(page.pagename)
        }
      }
    }

    const newRole: Role = {
      rolename: this.form.value.rolename,
      description: this.form.value.description,
      pages: scr
    };

    this.roleService.addRole(newRole)
      .subscribe();

    this.flashMessage.show("Role added.", {
      cssClass: 'card text-white bg-success h5 ht text-center',
      timeout: 2000
    });

    this.newForm();

    console.log(newRole);
  }
}
