import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material';
import { MatFormField } from '@angular/material';
import { MatInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material';



import { PeopleComponent } from './people.component';
import { PeopleAddComponent } from './people-add/people-add.component';
import { PeopleListComponent } from './people-list/people-list.component';

@NgModule({
  declarations: [
    PeopleComponent,
    PeopleAddComponent,
    PeopleListComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    MatCardModule,
    MatFormField,
    MatInputModule,
    BrowserAnimationsModule,
    FormsModule,
    MatExpansionModule
  ]
})
export class PeopleModule { }
