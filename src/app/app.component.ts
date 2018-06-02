import { Component } from '@angular/core';

import {Router} from "@angular/router";

import { user } from './user/user'
import { UserService } from './user/user.service'
import { LoginService} from './login.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  id: number;
  user: user;
  constructor(private router: Router, private UserService: UserService, private LoginService: LoginService) { }

  ngOnInit() {
	  console.log(localStorage.getItem("login"));
	  console.log(localStorage.getItem("token"));
	  console.log(localStorage.getItem("name"));
	  console.log(localStorage.getItem("id"));
	  this.id = +localStorage.getItem("id");
    console.log(localStorage.getItem("token")=== null)
    if (localStorage.getItem("token")){
      this.UserService.getUserByToken(localStorage.getItem("token")).subscribe(user => this.user = user)

    }

  }

	logout(){
		localStorage.removeItem("token");
		localStorage.removeItem("name");
    this.user = null
	}

	login(){
    console.log("login")
    this.LoginService.login().subscribe(response => console.log(response))
	//	this.router.navigate(['/login']);
	}
}
