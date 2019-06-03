import { Component, OnInit, OnDestroy } from '@angular/core';
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
  private peopleSub: Subscription;

  // Adding a constructor for dependency injection
  // Add an argument = peopleService and the type PeopleService
  // Use public keyword to create a new property
  constructor(public peopleService: PeopleService) {}

  ngOnInit() {
    this.peopleService.getPeople();
    this.peopleSub = this.peopleService.getPersonUpdateListener()
      .subscribe((people: Person[]) => {
        this.people = people;
      });
  }

  onDelete(personId: string) {
    this.peopleService.deletePerson(personId);
  }


  ngOnDestroy() {
    this.peopleSub.unsubscribe();
  }

}

