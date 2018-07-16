import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
  }

  loginSubmit(form){
    const user = {
      username : form.value.username,
      password : form.value.password
    }


    this.userService.authenticateUser(user)
      .subscribe(data => {
        if(data.success){
          this.toastr.success(data.message);
          this.userService.storeUserData(data.token, data.user);
          this.router.navigate(['view']);
        }else{
          this.toastr.error(data.message);
          this.router.navigate(['login']);
        }
      })
  }
}
