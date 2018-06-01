import { Component, OnInit } from '@angular/core';
import { PostComponent } from '../post.service';
import { post } from '../post/post.ts'

@Component({
  selector: 'app-ask',
  templateUrl: './ask.component.html',
  styleUrls: ['./ask.component.css']
})
export class AskComponent implements OnInit {

  ask: post[]

  constructor( private PostService: PostService) { }

  ngOnInit() {
    this.getAsk()

  }
  getAsk(){

    this.PostService.getAsk().subscribe(posts => this.ask = posts);

  }

}
