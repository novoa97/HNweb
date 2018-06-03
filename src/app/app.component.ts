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
  user: string = null
  karma: number = null

  constructor(private router: Router, private UserService: UserService, private LoginService: LoginService) { }

  ngOnInit() {
    if (localStorage.getItem("token")){
      console.log("Usuari conectat!")
      this.user = localStorage.getItem("name")
      this.karma = localStorage.getItem("karma")
      this.id =localStorage.getItem("id")
    }

  }

	logout(){
    localStorage.removeItem("name")
    localStorage.removeItem("id")
		localStorage.removeItem("token")
    localStorage.removeItem("karma")
    this.user = null
    this.karma = null
    this.id = null
    this.router.navigate(['/post']);
	}

	login(){
    console.log("login")
    //this.LoginService.login().subscribe(response => console.log(response))
    this.router.navigate(['/login']);
	}
  ngDoCheck() {

    if (localStorage.getItem("token")){
      console.log("Usuari conectat!")
      this.user = localStorage.getItem("name")
      this.karma = localStorage.getItem("karma")
      this.id =localStorage.getItem("id")
    }
  }


}
