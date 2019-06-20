import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Person } from './person.model';



@Injectable({providedIn: 'root'})
export class PeopleService {
  private people: Person[] = [];
  private peopleUpdated = new Subject<{people: Person[], peopleCount: number}>();

  constructor(private http: HttpClient, private router: Router) {}

  // Two methods get and add people
  getPeople(peoplePerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${peoplePerPage}&page=${currentPage}`;
    this.http
      .get<{ message: string; people: any; maxPeople: number }>('http://localhost:3000/api/people' + queryParams)
      .pipe(
        map(peopleData => {
        return {
          people: peopleData.people.map(person => {
          return {
          name: person.name,
          role: person.role,
          id: person._id
        };
      }),
      maxPeople: peopleData.maxPeople
    };
  })
      )
      .subscribe(transformedPeopleData => {
        this.people = transformedPeopleData.people;
        this.peopleUpdated.next({
          people: [...this.people],
          peopleCount: transformedPeopleData.maxPeople
        });
      });
}

  // This is an object for listening but not emitting given the 'private' peopleUpdated
  getPeopleUpdateListener() {
    return this.peopleUpdated.asObservable();
  }


  getPerson(id: string) {
    return this.http.get<{ _id: string; name: string; role: string }>('http://localhost:3000/api/people/' + id);
  }


  addPeople(name: string, role: string) {
    const person: Person = { id: null, name: name, role: role };
    this.http
      .post<{ message: string, personId: string }>('http://localhost:3000/api/people', person)
      .subscribe(responseData => {
        this.router.navigate(['/add']);
      });
  }

  updatePerson(id: string, name: string, role: string) {
    const person: Person = { id: id, name: name, role: role };
    this.http
      .put('http://localhost:3000/api/people/' + id, person)
      .subscribe(response => {
        this.router.navigate(['/people']);
  });
}

  deletePerson(personId: string) {
    return this.http
    .delete('http://localhost:3000/api/people/' + personId);

  }
}
