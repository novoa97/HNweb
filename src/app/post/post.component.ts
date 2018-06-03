import { Component, OnInit, Input  } from '@angular/core';

import { post } from './post';
import { user } from '../user/user'
import { Observable, of } from 'rxjs';

import { PostService } from '../post.service';
import { UserService } from '../user/user.service';

@Component({
  selector: 'posts',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  type: string;
  posts : post[];
  show: boolean = false;

  constructor(private PostService: PostService, private UserService: UserService) { }

  getPosts(): void {
      this.PostService.getPosts().subscribe((posts) => {
        this.posts = posts
        for ( let p of this.posts ){
          this.UserService.getuser(p.user_id).subscribe(user => p.user_name = user.name)
        }
      })
  }
  vote(): void{
      this.PostService.getAsk().subscribe(posts => this.posts = posts);
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
			
			window.location.reload();
     }
	 );
  }

  ngOnInit() {
      this.getPosts();
	  if (localStorage.getItem("token")) this.show = true;
	  else this.show = false;

  }

}
