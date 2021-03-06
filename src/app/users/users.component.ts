import { Component, OnInit, ViewChild  } from '@angular/core';
import { UserService } from '../user.service';
import { User } from '../user';
import { Country } from '../country';
import { Role } from '../role';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UsernameValidators } from '../app.validators';
import { DropdownService } from '../dropdown.service';
import { RoleService } from '../role.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  providers: [UserService, DropdownService]
})
export class UsersComponent implements OnInit {

  users: User[];
  user: User;

  countries: any[];
  country

  states: any[];
  state

  cities: Country["States"][];
  city: Country["States"];

  cName: string;
  sName: string;
  cityName: string;

  sDisabled: boolean = true;
  cDisabled: boolean = true;

  selectedUser: User
  toggleForm: boolean = false


  constructor(
    private userService: UserService,
    private ddService: DropdownService,
    private roleService: RoleService,
    private router: Router,
    private toastr: ToastrService) { }

  
  pw

  onChangePassword(){
    this.pw = true;
  }

  addUser(form) {

    var roleName

    for(let role of this.roles){
      if(role.Description === form.value.role){
        roleName = role.RoleName
      }
    }
    const newUser: User = {
      username: form.value.username,
      password: form.value.password,
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      role: roleName,
      country: form.value.country,
      state: form.value.state,
      city: form.value.city
    };

    this.userService.addUser(newUser)
      .subscribe(user => {
        this.users.push(user);
        this.userService.getUsers()
          .subscribe(users => this.users = users);

        this.toastr.success("User added.", 'Success!');
          
          form.reset();
        // this.router.navigate(['/login']); //Navigate to login page on adding a user
      })
  };

  deleteUser(user, id: any) {
    if (window.confirm("Are you sure to delete the entry for user " + user.firstname + "?")) {
      var users = this.users;
      this.userService.deleteUser(id)
        .subscribe(data => {
          if (data.n == 1) {
            for (var i = 0; i < users.length; i++) {
              if (users[i]._id == id) {
                users.splice(i, 1);
              }
            }
          this.toastr.info("User deleted.", 'Success!');
          }
        })
      if (this.toggleForm) {
        this.toggleForm = !this.toggleForm;
      }
    }
  }

  roleDesc: string

  updateUser(user) {
    if (!this.toggleForm) {
      this.selectedUser = user;


      for(let role of this.roles){
        if(this.selectedUser.role === role.RoleName){
          this.roleDesc = role.Description
        }
      }

      this.cName = user.country;
      this.sName = user.state;

      this.getStates();
      this.getCities();
      this.toggleForm = !this.toggleForm;
    }
    else {
      this.sDisabled = !this.sDisabled;
      this.cDisabled = !this.cDisabled;
      this.cName = "Country";
      this.sName = "State";
      
      this.states.push( { StateName: "State" } );

      this.toggleForm = !this.toggleForm;
    }
    

  }

  editUser(form) {
    var roleName

    for(let role of this.roles){
      if(role.Description === form.value.role){
        roleName = role.RoleName
      }
    }

    
    let newUser: User = {
      _id: this.selectedUser._id,
      firstname: form.value.firstname,
      lastname: form.value.lastname,
      email: form.value.email,
      role: roleName,
      country: form.value.country,
      state: form.value.state,
      city: form.value.city
    };

    if(this.pw){
      newUser.password = form.value.password
      this.pw = false;
    }


    this.userService.updateUser(newUser)
      .subscribe(user => {
        this.userService.getUsers()
          .subscribe(users => this.users = users);
        form.reset();
        this.sDisabled = !this.sDisabled;
        this.cDisabled = !this.cDisabled;
        this.cName = "Country";
        this.sName = "State";

        this.states.push( { StateName: "State" } );

        this.toastr.success("User details updated.", this.selectedUser.username);

        this.toggleForm = !this.toggleForm;
      });


  }

  getStates() {
    this.ddService.getStates(this.cName)
      .subscribe(states => this.states = states);

    if (this.toggleForm) {
      this.getCities();
    }
    if (!this.toggleForm) {
      this.sDisabled = false;
    }
  }

  getCities() {
    this.ddService.getCities(this.cName, this.sName)
      .subscribe(cities => this.cities = cities);
    if (!this.toggleForm) {
      this.cDisabled = false;
    }
  }

  roles: any[]
  role

  getStatics(){
    this.userService.getUsers()
      .subscribe(users => this.users = users);

    this.ddService.getCountries()
      .subscribe(countries => this.countries = countries);

    this.roleService.getRoles()
      .subscribe(roles => this.roles = roles);
  }

  ngOnInit() {
    this.getStatics();
  }
}
