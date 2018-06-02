import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { AppRoutingModule } from './/app-routing.module';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { CommentComponent } from './comment/comment.component';
import { TimeAgoPipe } from 'time-ago-pipe';
import { UserComponent } from './user/user.component';
import { HeaderComponent } from './header/header.component';
import { AskComponent } from './ask/ask.component';
import { LoginComponent } from './login/login.component';
import { NewestComponent } from './newest/newest.component';
import { ReplyComponent } from './reply/reply.component';
import { FormsModule }   from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    PostDetailComponent,
    CommentComponent,
    TimeAgoPipe,
    UserComponent,
    HeaderComponent,
    AskComponent,
	LoginComponent,
	NewestComponent,
	ReplyComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
	FormsModule
  ],
  providers: [{
				provide: LocationStrategy, 
				useClass: HashLocationStrategy
			  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
