import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Person } from './person.model';


@Injectable({providedIn: 'root'})
export class PeopleService {
  private people: Person[] = [];
  private peopleUpdated = new Subject<Person[]>();

  constructor(private http: HttpClient) {}

  // Two methods get and add people
  getPeople() {
    this.http
      .get<{ message: string; people: any }>('http://localhost:3000/api/people'
      )
      .pipe(map((peopleData) => {
        return peopleData.people.map(person => {
          return {
          name: person.name,
          role: person.role,
          id: person._id
         };
        });
      }))
      .subscribe((transformedPeople) => {
          this.people = transformedPeople;
          this.peopleUpdated.next([...this.people]);
      });
  }
  // This is an object for listening but not emitting given the 'private' peopleUpdated
  getPersonUpdateListener() {
    return this.peopleUpdated.asObservable();
  }

  getPerson(id: string) {
    return this.http.get<{ _id: string, name: string, role: string }>('http://localhost:3000/api/people/' + id);
  }

  addPerson(name: string, role: string) {
    const person: Person = { id: null, name: name, role: role };
    this.http
      .post<{ message: string, personId: string }>('http://localhost:3000/api/people', person)
      .subscribe(responseData => {
        const id = responseData.personId;
        person.id = id;
        this.people.push(person);
        this.peopleUpdated.next([...this.people]);
      });
  }

  updatePerson(id: string, name: string, role: string) {
    const person: Person = { id: id, name: name, role: role };
    this.http
      .put('http://localhost:3000/api/people/' + id, person)
      .subscribe(response => {
        const updatedPeople = [...this.people];
        const originalPersonIndex = updatedPeople.findIndex(p => p.id === person.id);
        updatedPeople[originalPersonIndex] = person;
        this.people = updatedPeople;
        this.peopleUpdated.next([...this.people]);
    });
  }

  deletePerson(personId: string) {
    this.http.delete('http://localhost:3000/api/people/' + personId)
      .subscribe(() => {
        const updatedPeople = this.people.filter(person => person.id !== personId);
        this.people = updatedPeople;
        this.peopleUpdated.next([...this.people]);
      });
  }
}
