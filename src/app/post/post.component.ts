import { Component, OnInit, Input  } from '@angular/core';

import { post } from './post';
import { user } from '../user/user'
import { Observable, of } from 'rxjs';

import { PostService } from '../post.service';
import { UserService } from '../user/user.service';
import { Router }  from "@angular/router";

@Component({
  selector: 'posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  type: string;
  posts : post[];
  idsesion: number = null;

  constructor(private PostService: PostService, private UserService: UserService, private router: Router) { }

  getPosts(): void {
      this.PostService.getPosts().subscribe((posts) => {
        this.posts = posts
        for ( let p of this.posts ){
          this.UserService.getuser(p.user_id).subscribe(user => p.user_name = user.name)
          /*this.PostService.getVoted(p.id).subscribe( (response) =>*/ p.voted = false//)
        }
      })
  }
  vote(i): void{
      if (localStorage.getItem("token")){
        this.posts[i].voted = true;
        this.PostService.vote(this.posts[i].id).subscribe( response => console.log(response))
        this.posts[i].upvotes_count = this.posts[i].upvotes_count + 1
      }
      else this.router.navigate(['/login']);
  }
  unvote(i){
      this.posts[i].voted = false
      this.PostService.unvote(this.posts[i].id)
      this.posts[i].upvotes_count = this.posts[i].upvotes_count - 1
  }

  deletePost(index) {
	  this.PostService.deletePost(this.posts[index].id).subscribe(
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
            this.posts.splice(index, 1);
     }
	 );
  }

  ngOnInit() {
    this.getPosts();
	  if (localStorage.getItem("id")) this.idsesion = +localStorage.getItem("id") ;
	  else this.idsesion = null;

  }

}
