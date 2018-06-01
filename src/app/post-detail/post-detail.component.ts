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


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.css']
})
export class PostDetailComponent implements OnInit {

  post: post;
  name: string
  comments: comment[]

  constructor(
    private route: ActivatedRoute,
    private PostService: PostService,
    private location: Location,
    private UserService: UserService,
    private CommentService: CommentService
  ) {}

  ngOnInit(): void {
    this.getPost();
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
        console.log(user.name)
        this.name = user.name},
      (error) =>{console.log(error)}
    )
  }
}
