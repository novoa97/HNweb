import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { FormsModule }   from '@angular/forms';
import {Router} from "@angular/router";

import { user } from './user'
import { UserService } from './user.service'

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  about: string
  user: user;
  id: number;
  done: boolean = null;
  missatge: string

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private UserService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.getUser()
    this.id = +localStorage.getItem("id")
  }

  getUser(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.UserService.getuser(id).subscribe(user => this.user = user);
  }
  update(){
    this.UserService.update(this.user.about).subscribe(
      (response) =>{
        this.missatge = "Canviat correctament l'About"
      },
      (error) =>{
        this.missatge = "Error"
      }
    )
  }
  inici(){
    this.router.navigate(['/']);
  }

}
