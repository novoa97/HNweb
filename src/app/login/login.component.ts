import { Component, OnInit } from '@angular/core';
import { FormsModule }   from '@angular/forms';

import { UserService } from '../user/user.service';

import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  token: string; 
  name: string;
  constructor(private UserService: UserService, private router: Router) { }

  ngOnInit() {
	  this.name = "null";
  }
  
  submitted = false;
  
  onSubmit() {this.submitted = true; }
  
  getSessio(){
	  this.UserService.getUserByToken(this.token).subscribe(user => localStorage.setItem('name', user.name));
	  localStorage.setItem('token', this.token);
	  this.router.navigate(['/']);
  }
  
  
  

}
