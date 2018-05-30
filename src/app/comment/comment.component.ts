import { Component, OnInit, Input } from '@angular/core';

import { comment } from './comment';
import { CommentService } from './comment.service'

@Component({
  selector: 'comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input('comments') comments: comment[];
  @Input('reply') replyid: number


  constructor( private CommentService: CommentService) { }

  ngOnInit() {
    if ( this.replyid == null){

    }
    else{
    this.getReply();
    }
  }
  
  getReply(): void {
    this.CommentService.getReply(this.replyid).subscribe(comments => this.comments = comments);
  }


}
