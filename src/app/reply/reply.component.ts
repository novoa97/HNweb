import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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
  user: user
  reply_to_pass: string;

  constructor(
	private route: ActivatedRoute,
	private CommentService: CommentService,
	private UserService: UserService,
	private router: Router
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
							this.user = user
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
	  this.CommentService.postReply(this.reply_to_pass, +this.comment.post_id, this.comment.id).subscribe(
		(comment) => {
            /* this function is executed every time there's a new output */


		},
		(err) => {
            /* this function is executed when there's an ERROR */
            console.log("ERROR: "+err);
		},
		() => {
            /* this function is executed when the observable ends (completes) its stream */
            console.log("COMPLETED");
			this.router.navigate(['/post/'+this.comment.post_id]);

			}
		);
  }

}
