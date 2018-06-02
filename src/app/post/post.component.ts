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



  ngOnInit() {
      this.getPosts();

  }

}
