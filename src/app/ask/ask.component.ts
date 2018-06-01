import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { post } from '../post/post.ts'

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  asks: post[]

  constructor( private PostService: PostService) { }

  ngOnInit() {
    this.getAsk()

  }
  getAsk(){

    this.PostService.getAsk().subscribe(posts => this.asks = posts);

  }

}
