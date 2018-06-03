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
  idsesion: number = null;

  constructor( private CommentService: CommentService) { }

  ngOnInit() {
    if ( this.replyid == null){

    }
    else{
    this.getReply();
    }
	if (localStorage.getItem("id")) this.idsesion = +localStorage.getItem("id") ;
	else this.idsesion = null;
  }
  
  getReply(): void {
    this.CommentService.getReply(this.replyid).subscribe(comments => this.comments = comments);
  }
  
  deleteComment(index){
	  this.CommentService.deleteComment(this.comments[index].id).subscribe(
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


}
