import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { user } from './user'
import { UserService } from './user.service'

@Component({
  selector: 'user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  user: user;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private UserService: UserService
  ) { }

  ngOnInit() {
    this.getUser()
  }

  getUser(){
    const id = +this.route.snapshot.paramMap.get('id');
    this.UserService.getuser(id).subscribe(user => this.user = user);
  }

}
