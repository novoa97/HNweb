import { Component } from '@angular/core';

import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  id: number;
  constructor(private router: Router) { }

  ngOnInit() {
    	console.log(localStorage.getItem("login"));
    	console.log(localStorage.getItem("token"));
    	console.log(localStorage.getItem("name"));
    	console.log(localStorage.getItem("id"));
    	this.id = +localStorage.getItem("id");
        if (localStorage.getItem("token") === null) {
    		document.getElementById("logout").style.visibility="hidden";
    		document.getElementById("login").style.visibility="visible";
    		document.getElementById("th").style.visibility="hidden";
    	}
    	else {
    		document.getElementById("login").style.visibility="hidden";
    		document.getElementById("logout").style.visibility="visible";
    		document.getElementById("threads").style.visibility="visible";
    	}
    }

  	logout(){
  		localStorage.removeItem("token");
  		localStorage.removeItem("name");
  		document.getElementById("logout").style.visibility="hidden";
  		document.getElementById("login").style.visibility="visible";
  	}

  	login(){
  		this.router.navigate(['/login']);
  	}
}
