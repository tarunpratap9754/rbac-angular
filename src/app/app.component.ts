import { Component } from '@angular/core';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  onLogoutClick(){
    this.userService.logout();
    console.log("You are logged out");
    this.router.navigate(['login']);
    return false;
  }
}
