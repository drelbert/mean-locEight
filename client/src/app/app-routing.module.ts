import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleAddComponent } from './people/people-add/people-add.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { PeopleComponent } from './people/people.component';
import { BaseComponent } from './base/base.component';
import { ProjectsAddComponent } from './projects/projects-add/projects-add.component';

const routes: Routes = [
  { path: '', component: BaseComponent },
  { path: 'people', component: PeopleComponent},
  { path: 'add', component: PeopleComponent },
  { path: 'edit/:personId', component: PeopleComponent },
  { path: 'projects', component: ProjectsListComponent },
  { path: 'addProject', component: ProjectsListComponent },
  { path: 'editProject/:projectId', component: ProjectsAddComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
