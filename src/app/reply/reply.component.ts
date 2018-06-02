import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { comment } from '../comment/comment'
import { CommentService} from '../comment/comment.service'

import { UserService } from '../user/user.service';
import { user } from '../user/user'

@Component({
  selector: 'app-reply',
  templateUrl: './reply.component.html',
  styleUrls: ['./reply.component.css']
})
export class ReplyComponent implements OnInit {
  comment: comment;
  name: string;
  reply_to_pass: string;

  constructor(
	private route: ActivatedRoute, 
	private CommentService: CommentService,
	private UserService: UserService 	
	) { }

  ngOnInit() {
	  this.getComment();
  }
  
  getComment(){
	  const id = +this.route.snapshot.paramMap.get('id');
	  this.CommentService.getComment(id).subscribe(
		(comment) => {
					this.comment = comment;
					this.UserService.getuser(comment.user_id).subscribe(
						(user) =>{
							this.name = user.name
						},
						(error) =>{console.log(error)}
					)
		},
		(err) => {
            /* this function is executed when there's an ERROR */
            console.log("ERROR: "+err);
		});
	  
  }
  
  reply(){
	  console.log(this.reply_to_pass);
  }

}
