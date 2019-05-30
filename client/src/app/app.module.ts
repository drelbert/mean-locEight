import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { MatProgressSpinnerModule,
        MatMenuModule,
        MatToolbarModule,
        MatPaginatorModule
        } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { LayoutModule } from '@angular/cdk/layout';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { PeopleComponent } from './people/people.component';
import { PeopleAddComponent } from './people/people-add/people-add.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { ProjectsListComponent } from './projects/projects-list/projects-list.component';
import { ProjectsAddComponent } from './projects/projects-add/projects-add.component';
import { BaseComponent } from './base/base.component';

//Note about imports, must be done here and at the specific component.

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PeopleComponent,
    PeopleAddComponent,
    PeopleListComponent,
    ProjectsAddComponent,
    ProjectsListComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatGridListModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatMenuModule,
    HttpClientModule,
    RouterModule,
    LayoutModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
