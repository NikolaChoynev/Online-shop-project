import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IUser } from 'src/app/shared/interfaces';
import { UserService } from 'src/app/user/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  get isLogged(): boolean {
    return this.userService.isLogged;
  }

  get currentUser(): IUser {
    return this.userService.currentUser;
  }

  constructor(
    public userService: UserService,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  logoutHandler(): void {
    this.userService.logout().subscribe(() => {
      this.router.navigate(['/user/login']);
      // alert('Logged out!');
    });
  }

}
