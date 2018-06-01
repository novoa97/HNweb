import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { post } from '../post/post'


import { UserService } from '../user/user.service'
import { user } from '../user/user'

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  asks: post[]

  constructor( private PostService: PostService; private UserService: UserService) { }

  ngOnInit() {
    this.getAsk()

  }
  getAsk(){

    this.PostService.getAsk().subscribe((posts) => {
      this.asks = posts
      for ( let p of this.asks ){
        this.UserService.getuser(p.user_id).subscribe(user => p.user_name = user.name)
      }
    })

  }

}
