import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  loginSubmit(form){
    const user = {
      username : form.value.username,
      password : form.value.password
    }

    console.log(user);

    this.userService.authenticateUser(user)
      .subscribe(data => {
        if(data.success){
          this.userService.storeUserData(data.token, data.user);
          this.router.navigate(['view']);
        }else{
          console.log(data.message);
          this.router.navigate(['login']);
        }
      })
  }
}
