import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MatInputModule,
         MatCardModule,
         MatButtonModule,
         MatExpansionModule,
         MatProgressSpinnerModule,
         MatPaginatorModule
        } from '@angular/material';


import { ProjectsComponent } from './projects.component';
import { ProjectsAddComponent } from './projects-add/projects-add.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

@NgModule({
  declarations: [
    ProjectsComponent,
    ProjectsAddComponent,
    ProjectsListComponent],

  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatExpansionModule,
    RouterModule,
    MatProgressSpinnerModule,
    MatPaginatorModule

  ]
})
export class ProjectsModule { }
