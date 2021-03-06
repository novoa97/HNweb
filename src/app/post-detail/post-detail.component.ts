 import { Component, OnInit} from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
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
  name: string = "Hola"
  comments: comment[]
  comment_to_pass: string
  user: user
  idsesion: number = null;

  constructor(
    private route: ActivatedRoute,
    private PostService: PostService,
    private location: Location,
    private UserService: UserService,
    private CommentService: CommentService,
	private router: Router
  ) {}

  ngOnInit(): void {

    this.getPost();
	if (localStorage.getItem("id")) this.idsesion = +localStorage.getItem("id") ;
	else this.idsesion = null;
	if(this.post.text == null)document.getElementById("text").style.visibility="hidden";
  }

  getPost(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.PostService.getPostbyid(id).subscribe((post) =>{
      this.post = post
      this.getNameUser(this.post.user_id)
      this.PostService.getVoted(id).subscribe( response => this.post.voted = response)
    })
    this.CommentService.getCommentsPost(id).subscribe((comments) =>{
       this.comments = comments
       for ( let c of this.comments ){
         this.UserService.getuser(c.user_id).subscribe(user => c.usuari = user.name)
         this.CommentService.getVoted(c.id).subscribe( response => c.voted = response)
       }
     })
  }
  getNameUser(user_id) {
    this.UserService.getuser(user_id).subscribe(
      (user) =>{
        this.user = user},
      (error) =>{console.log(error)}
    )
  }


  deletePost() {
	  this.PostService.deletePost(this.post.id).subscribe(
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

			this.router.navigate(['/']);
     }
	 );
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

     }
 );

  }

  vote(){
      if (localStorage.getItem("token")){
        this.post.voted = true;
        this.PostService.vote(this.post.id).subscribe( response => console.log(response))
        this.post.upvotes_count = this.post.upvotes_count + 1
      }
      else this.router.navigate(['/login']);
  }
  unvote(){
      this.post.voted = false
      this.PostService.unvote(this.post.id).subscribe( response => console.log(response))
      this.post.upvotes_count = this.post.upvotes_count - 1
  }
}
