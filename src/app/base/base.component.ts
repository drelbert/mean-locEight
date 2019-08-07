import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { PeopleService } from '../people/people-list/people.service';
import { Person } from '../people/people-list/person.model';

@Component({
  selector: 'app-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.scss']
})
export class BaseComponent implements OnInit, OnDestroy {
  /* Usig structural directives here.
  people = [
    {name: 'Vader', project: 'Sod Install 2029'},
    {name: 'Lupe', project: 'Spruce Install 229'},
    {name: 'Hans', project: 'Jacuzzi drop 273'}
  ];
  */

// This is the list of properties.
people: Person[] = [];
peoplePerPage = 2;
totalPeople = 0;
private peopleSub: Subscription;

// Using the dependency injection system.
constructor(public peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleService.getPeople(this.peoplePerPage, this.totalPeople);
    this.peopleSub = this.peopleService
    .getPeopleUpdateListener()
      .subscribe((personData: {people: Person[], peopleCount: number}) => {
        this.people = personData.people;
        this.totalPeople = personData.peopleCount;
      });
  }

  ngOnDestroy() {
    this.peopleSub.unsubscribe();
  }
}

