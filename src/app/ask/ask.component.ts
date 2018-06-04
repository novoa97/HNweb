import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { post } from '../post/post'


import { UserService } from '../user/user.service'
import { user } from '../user/user'

import { Router }  from "@angular/router";

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  asks: post[]
  idsesion: number = null;
  
  constructor( private PostService: PostService, private UserService: UserService, private router: Router) { }

  ngOnInit() {
    this.getAsk()
	if (localStorage.getItem("id")) this.idsesion = +localStorage.getItem("id") ;
	else this.idsesion = null;

  }
  getAsk(){

    this.PostService.getAsk().subscribe((posts) => {
      this.asks = posts
      for ( let p of this.asks ){
        this.UserService.getuser(p.user_id).subscribe(user => p.user_name = user.name)
		this.PostService.getVoted(p.id).subscribe( (response) =>{
            p.voted = response
            console.log(response)
          })
      }
    })

  }
  
  vote(i): void{
      if (localStorage.getItem("token")){
        this.asks[i].voted = true;
        this.PostService.vote(this.asks[i].id).subscribe( response => console.log(response))
        this.asks[i].upvotes_count = this.asks[i].upvotes_count + 1
      }
      else this.router.navigate(['/login']);
  }
  unvote(i){
      this.asks[i].voted = false
      this.PostService.unvote(this.asks[i].id).subscribe( response => console.log(response))
      this.asks[i].upvotes_count = this.asks[i].upvotes_count - 1
  }
  
  deletePost(index) {
	  this.PostService.deletePost(this.asks[index].id).subscribe(
     (post) => {
            /* this function is executed every time there's a new output */
           console.log("VALUE RECEIVED: "+post);

     },
     (err) => {
            /* this function is executed when there's an ERROR */
            console.log("ERROR: "+err);
     },
     () => {
            /* this function is executed when the observable ends (completes) its stream */
            console.log("COMPLETED");
            this.asks.splice(index, 1);
     }
	 );
  }

}
