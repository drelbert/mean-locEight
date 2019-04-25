import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Person } from './person.model';


@Injectable({providedIn: 'root'})
export class PeopleService {
  private people: Person[] = [];
  private peopleUpdated = new Subject<Person[]>();
  // Two methods get and add people
  getPeople() {
    return [...this.people];
  }

  getPeopleUpdateListener() {
    return this.peopleUpdated.asObservable();
  }

  addPeople(name: string, role: string) {
    const person: Person = {name: name, role: role};
    this.people.push(person);
    this.peopleUpdated.next([...this.people]);
  }
}
