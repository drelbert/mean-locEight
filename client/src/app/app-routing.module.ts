import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PeopleComponent } from './people/people.component';
import { BaseComponent } from './base/base.component';



const routes: Routes = [
  { path: '', component: BaseComponent},
  { path: 'people', component: PeopleComponent},
  { path: 'add', component: PeopleComponent},
  { path: 'edit/:personId', component: PeopleComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
