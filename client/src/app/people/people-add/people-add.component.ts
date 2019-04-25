import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { PeopleService } from '../people-list/people.service';

@Component({
  selector: 'app-people-add',
  templateUrl: './people-add.component.html',
  styleUrls: ['./people-add.component.scss']
})
export class PeopleAddComponent {
  // Adding the property
      enteredName = '';
      enteredRole = '';


      constructor(public peopleService: PeopleService) {}

// Hey, this is a method
      onAddPerson(form: NgForm) {
        if (form.invalid) {
          return;
      }
      this.peopleService.addPeople(form.value.name, form.value.role);
        form.resetForm();
      }
}
