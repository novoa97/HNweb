import { Component, OnInit } from '@angular/core';
import { PostService } from '../post.service';
import { post } from '../post/post'


import { UserService } from '../user/user.service'
import { user } from '../user/user'

@Component({
  selector: 'app-ask',
  templateUrl: './newest.component.html',
  styleUrls: ['./newest.component.css']
})
export class NewestComponent implements OnInit {

  asks: post[]
  idsesion: number = null;

  constructor( private PostService: PostService, private UserService: UserService) { }

  ngOnInit() {
    this.getAsk()
	if (localStorage.getItem("id")) this.idsesion = +localStorage.getItem("id") ;
	else this.idsesion = null;

  }
  getAsk(){

    this.PostService.getNewest().subscribe((posts) => {
      this.asks = posts
      for ( let p of this.asks ){
        this.UserService.getuser(p.user_id).subscribe(user => p.user_name = user.name)
      }
    })

  }
  
  deletePost(index) {
	  this.PostService.deletePost(this.asks[index].id).subscribe(
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
            this.asks.splice(index, 1);
     }
	 );
  }

}
