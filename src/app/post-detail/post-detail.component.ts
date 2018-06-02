 import { Component, OnInit} from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Observable, of } from 'rxjs';

import { PostService }  from '../post.service';
import { post } from '../post/post'

import { UserService } from '../user/user.service';
import { user } from '../user/user'

import { comment } from '../comment/comment'
import { CommentService} from '../comment/comment.service'

import { FormsModule }   from '@angular/forms';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: post;
  name: string
  comments: comment[]
  comment_to_pass: string

  constructor(
    private route: ActivatedRoute,
    private PostService: PostService,
    private location: Location,
    private UserService: UserService,
    private CommentService: CommentService
  ) {}

  ngOnInit(): void {
    this.getPost();
	if(this.post.text == null)document.getElementById("text").style.visibility="hidden";
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.PostService.getPostbyid(id).subscribe((post) =>{
      this.post = post
      this.getNameUser(this.post.user_id)
    })
    this.CommentService.getCommentsPost(id).subscribe(comments =>  this.comments = comments )
  }
  getNameUser(user_id) {
    this.UserService.getuser(user_id).subscribe(
      (user) =>{
        this.name = user.name},
      (error) =>{console.log(error)}
    )
  }

  comment(){

	  this.CommentService.postComment(this.comment_to_pass, this.post.id).subscribe(
     (comment) => {
            /* this function is executed every time there's a new output */
           console.log("VALUE RECEIVED: "+comment);
           this.comments.push(comment)
     },
     (err) => {
            /* this function is executed when there's an ERROR */
            console.log("ERROR: "+err);
     },
     () => {
            /* this function is executed when the observable ends (completes) its stream */
            console.log("COMPLETED");
           //this.CommentService.getCommentsPost(this.post.id).subscribe(comments =>  this.comments = comments )

     }
 );
	console.log ("adeu")
  }
}
