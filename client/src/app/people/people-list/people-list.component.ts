import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { Person } from './person.model';
import { PeopleService } from './people.service';



@Component({
  selector: 'app-people-list',
  templateUrl: './people-list.component.html',
  styleUrls: ['./people-list.component.scss']
})


export class PeopleListComponent implements OnInit, OnDestroy {

  /*
    { name: 'El Jeffe', role: 'Manager of Managers'},
    { name: 'Tor Del Torro', role: 'Master Jedi'},
    { name: 'Vader', role: 'Chief Dark Jedi'},
    { name: 'Rey', role: 'Intermediate Jedi'}
  ];
  */
  people: Person[] = [];
  isLoading = false;
  totalPeople = 0;
  peoplePerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 4, 10];
  private peopleSub: Subscription;

  // Adding a constructor for dependency injection
  // Add an argument = peopleService and the type PeopleService
  // Use public keyword to create a new property
  constructor(public peopleService: PeopleService) {}

  ngOnInit() {
    this.isLoading = true;
    this.peopleService.getPeople(this.peoplePerPage, this.currentPage);
    this.peopleSub = this.peopleService
    .getPeopleUpdateListener()
    .subscribe((personData: {people: Person[], peopleCount:  number}) => {
        this.isLoading = false;
        this.totalPeople = personData.peopleCount;
        this.people = personData.people;
      });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.peoplePerPage = pageData.pageSize;
    this.peopleService.getPeople(this.peoplePerPage, this.currentPage);
  }


  onDelete(personId: string) {
      this.isLoading = true;
      this.peopleService.deletePerson(personId).subscribe(() => {
        this.peopleService.getPeople(this.peoplePerPage, this.currentPage);
      });
  }

  ngOnDestroy() {
    this.peopleSub.unsubscribe();
  }

}

