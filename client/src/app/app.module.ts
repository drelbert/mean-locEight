import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule} from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material';
import { MatButtonModule } from '@angular/material';
import { MatToolbarModule } from '@angular/material';
import { MatExpansionModule } from '@angular/material';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { PeopleComponent } from './people/people.component';
import { PeopleAddComponent } from './people/people-add/people-add.component';
import { PeopleListComponent } from './people/people-list/people-list.component';
import { BaseComponent } from './base/base.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    PeopleComponent,
    PeopleAddComponent,
    PeopleListComponent,
    BaseComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatGridListModule,
    MatExpansionModule,
    HttpClientModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
