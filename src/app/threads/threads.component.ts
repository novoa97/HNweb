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

  constructor(private route: ActivatedRoute, private CommentService: CommentService) { }

  ngOnInit() {
    this.getComments();
  }
  
  getComments(){
	  const id = +this.route.snapshot.paramMap.get('id');
	  this.CommentService.getThreads(id).subscribe(comments => this.comments = comments);
  }
 


}
