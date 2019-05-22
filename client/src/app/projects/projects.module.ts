import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatExpansionModule
        } from '@angular/material';


import { ProjectsAddComponent } from './projects-add/projects-add.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

@NgModule({
  declarations: [
    ProjectsAddComponent,
    ProjectsListComponent],

  imports: [
    CommonModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    RouterModule
  ]
})
export class ProjectsModule { }
