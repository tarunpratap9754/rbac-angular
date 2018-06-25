import { Component, OnInit } from '@angular/core';
import { Role } from '../role';
import { FormArray, FormGroup, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { RoleService } from '../role.service';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {

  constructor(private roleService : RoleService) { }

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

  buildScreens() {
    const arr = this.pages.map(screen => {
      return new FormGroup({
        name: new FormControl(screen.name),
        access: new FormControl(screen.access)
      })
    });
    return new FormArray(arr,[this.checkOne]);
  }

  form = new FormGroup({
    rolename: new FormControl('', [Validators.required, Validators.minLength(6), Validators.maxLength(50)]),
    description: new FormControl('This role describes a Client.', [Validators.required, Validators.minLength(10), Validators.maxLength(200)]),
    screens: this.buildScreens()
  });

  checkOne(control: FormArray) {
    var input = control.value
    for (var i = 0; i < control.length; i++){
      var status = status || input[i].access
    }
    if(status == false){
      return {
        checkList: {
          checkOne: status
        }
      }
    }
    else{
      return null
    }
  }

  addRole(form) {
    var arr = [];

    for(let obj of this.form.value.screens  ){
      if(obj.access === true){
        arr.push(obj.name)
      }
    }

    const newRole: Role = {
      rolename: this.form.value.rolename,
      description: this.form.value.description,
      pages: arr
    };

    this.roleService.addRole(newRole)
      .subscribe();

    this.form.reset({
      description: "This role describes a Client.",
      rolename: "",
      screens: [
        { name: "Page1", access: true },
        { name: "Page2", access: false },
        { name: "Page3", access: false },
        { name: "Page4", access: false },
        { name: "Page5", access: false }
      ]
    })

    console.log(newRole);
  }
}
