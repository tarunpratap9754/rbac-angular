import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-mock-view',
  templateUrl: './mock-view.component.html',
  styleUrls: ['./mock-view.component.css']
})
export class MockViewComponent implements OnInit {

  constructor(
    private userService: UserService,
    private router: Router
  ) { }

  user 

  ngOnInit() {
    this.userService.getProfile()
      .subscribe(profile => {
        console.log(profile);
        this.user = profile.user;
  },
  err => {
    console.log(err);
    return false
  });            

}
}
