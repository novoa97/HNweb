import { Component, OnInit } from '@angular/core';
import { post } from '../post/post';
import { user } from '../user/user'
import { Observable, of } from 'rxjs';

import { PostService } from '../post.service';
import { UserService } from '../user/user.service';
import { Router } from "@angular/router";
@Component({
  selector: 'app-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.css']
})
export class PostFormComponent implements OnInit {
title: string = null
url: string = null
text: string = null
tipo: string = null
content: string = null
constructor(private PostService: PostService, private UserService: UserService, private router: Router ) { }

  ngOnInit() {

  }

  postCreate() {
    if ((this.url === '' || this.url === null) && (this.text === '' || this.text === null)) {
      console.log("caca")
      return
    }
    if (this.url != null && this.text != null) {
      console.log("caca")
      return
    }
    if (this.url === null || this.url === '') {
      this.tipo = 'ask'
      this.content = this.text
    }
    else {
      this.tipo = 'url'
      this.content = this.url
    }
    console.log(this.tipo)
    this.PostService.createPost(this.title, this.tipo,this.content).subscribe(
     (post) => {
            /* this function is executed every time there's a new output */

            this.router.navigate(['/post/'+post.id]);
     },
     (err) => {
            /* this function is executed when there's an ERROR */
            /*var msg = null
            console.log('status: '+ err.headers.get("status") )
            console.log(msg.headers.status)
            if (msg.headers.status === 302) {
              console.log("dani")
              this.router.navigate(['/post/'+msg.error.id]);
            }*/
            this.router.navigate(['/post/'+ err.error.id]);
     },
     () => {
            /* this function is executed when the observable ends (completes) its stream */
            console.log("COMPLETED");
           //this.CommentService.getCommentsPost(this.post.id).subscribe(comments =>  this.comments = comments )
     }
   );
  }

}
