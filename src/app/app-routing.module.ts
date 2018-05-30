import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PostComponent } from './post/post.component';
import { PostDetailComponent } from './post-detail/post-detail.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  { path: 'post', component: PostComponent },
  { path: '', component: PostComponent},
  { path: 'post/:id', component: PostDetailComponent },
  { path: 'user/:id', component: UserComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})

export class AppRoutingModule { }
