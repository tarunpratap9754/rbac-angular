import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {


  constructor(
    private userService: UserService,
    private router: Router,
    private flashMessage: FlashMessagesService
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
          this.flashMessage.show(data.message, {
            cssClass: 'card text-white bg-success blockquote text-center',
            timeout: 2000});
          this.userService.storeUserData(data.token, data.user);
          this.router.navigate(['view']);
        }else{
          this.flashMessage.show(data.message, {
            cssClass: 'card text-white bg-danger blockquote text-center',
            timeout: 2000});
          this.router.navigate(['login']);
        }
      })
  }
}
