import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { MatFormField } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material';
import { RouterModule } from '@angular/router';

import { ProjectsAddComponent } from './projects-add/projects-add.component';
import { ProjectsListComponent } from './projects-list/projects-list.component';

@NgModule({
  declarations: [ProjectsAddComponent, ProjectsListComponent],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    MatExpansionModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    BrowserAnimationsModule

  ]
})
export class ProjectsModule { }
