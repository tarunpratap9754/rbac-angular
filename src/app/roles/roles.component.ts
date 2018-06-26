import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {

  constructor() { }

  rolename

  pages = [
    {
      "name": "Page1",
      "access": true
    },
    {
      "name": "Page2",
      "access": false
    },
    {
      "name": "Page3",
      "access": false
    },
    {
      "name": "Page4",
      "access": false
    },
    {
      "name": "Page5",
      "access": false
    }
  ]

ngOnInit() {
  
}

addRole(form) {
  console.log(form.value);

  const newRole: Role = {
    rolename: form.value.rolename,
    description: form.value.description,
    pages: []
  };

  form.reset({
    description: "",
    rolename: "",
    pages: []
  })

  console.log(newRole);
}

checkOff(page){
  page.access = !page.access
}
}
