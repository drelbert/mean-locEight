import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AngularMaterialModule } from '../angular-material.module';

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
    BrowserAnimationsModule,
    ReactiveFormsModule,
    RouterModule,
    ReactiveFormsModule,
    AngularMaterialModule

  ]
})
export class PeopleModule { }
