import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { PeopleComponent } from './people/people.component';
import { ProjectsComponent } from './projects/projects.component';
import { BaseComponent } from './base/base.component';
import { LoginComponent } from './auth/login/login.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthGuard } from './auth/auth.guard';


const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'people', component: PeopleComponent, canActivate: [AuthGuard] },
  { path: 'add', component: PeopleComponent, canActivate: [AuthGuard] },
  { path: 'edit/:personId', component: PeopleComponent, canActivate: [AuthGuard] },
  { path: 'projects', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'addProject', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'editProject/:projectId', component: ProjectsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent},
  { path: 'signup', component: SignupComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
