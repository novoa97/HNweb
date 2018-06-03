import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { CommentService } from '../comment/comment.service'
import { comment } from '../comment/comment';

@Component({
  selector: 'threads',
  templateUrl: './threads.component.html',
  styleUrls: ['./threads.component.css']
})
export class ThreadsComponent implements OnInit {

  @Input('comments') comments: comment[];
  idsesion: number = null;

  constructor(private route: ActivatedRoute, private CommentService: CommentService) { }

  ngOnInit() {
    this.getComments();
	if (localStorage.getItem("id")) this.idsesion = +localStorage.getItem("id") ;
	else this.idsesion = null;
  }
  
  getComments(){
	  const id = +this.route.snapshot.paramMap.get('id');
	  this.CommentService.getThreads(id).subscribe(comments => this.comments = comments);
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
