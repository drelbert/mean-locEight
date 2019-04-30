import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Person } from './person.model';


@Injectable({providedIn: 'root'})
export class PeopleService {
  private people: Person[] = [];
  private peopleUpdated = new Subject<Person[]>();

  constructor(private http: HttpClient) {}

  // Two methods get and add people
  getPeople() {
    this.http.get<{message: string, people: Person[]}>('http://localhost:3000/api/people')
      .subscribe((peopleData) => {
          this.people = peopleData.people;
          this.peopleUpdated.next([...this.people]);
      });
  }
  // This is an object for listening but not emitting given the 'private' peopleUpdated
  getPeopleUpdateListener() {
    return this.peopleUpdated.asObservable();
  }

  addPeople(name: string, role: string) {
    const person: Person = { id: null, name: name, role: role };
    this.http
      .post<{ message: string }>('http://localhost:3000/api/people', person)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.people.push(person);
        this.peopleUpdated.next([...this.people]);
      });
  }
}
