import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserComponent } from './user/user.component';
import { AskComponent } from './ask/ask.component';
import { LoginComponent } from './login/login.component'
import { NewestComponent } from './newest/newest.component'
import { ReplyComponent } from './reply/reply.component'
import { ThreadsComponent } from './threads/threads.component'
import { PostFormComponent} from './post-form/post-form.component'


const routes: Routes = [
  { path: 'post', component: PostComponent },
  { path: 'ask', component: AskComponent },
  { path: '', component: PostComponent},
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'user/:id', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'newest', component: NewestComponent },
  { path: 'reply/:id', component: ReplyComponent },
  { path: 'threads/:id', component: ThreadsComponent },
  { path: 'submit', component: PostFormComponent},
  { path: 'logout', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
