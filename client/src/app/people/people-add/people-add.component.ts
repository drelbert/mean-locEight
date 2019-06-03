import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { PeopleService } from '../people-list/people.service';
import { Person } from '../people-list/person.model';


@Component({
  selector: 'app-people-add',
  templateUrl: './people-add.component.html',
  styleUrls: ['./people-add.component.scss']
})
export class PeopleAddComponent implements OnInit {
  // Adding the property
      enteredName = '';
      enteredRole = '';
      person: Person;
      private mode = 'add';
      private personId: string;


constructor(public peopleService: PeopleService, public route: ActivatedRoute) {}

// Method to determine if there is a personId parameter or not
// This is to tell if in 'add' or 'edit' mode
// Look into paramMap to see if object exixts
// If there, then extract and use to edit, if not then in create mode
ngOnInit() {
  this.route.paramMap.subscribe((paramMap: ParamMap) => {
    if (paramMap.has('personId')) {
      this.mode = 'edit';
      this.personId = paramMap.get('personId');
      this.peopleService.getPerson(this.personId).subscribe(personData => {
        this.person = {id: personData._id, name: personData.name, role: personData.role};
      });
    } else {
      this.mode = 'add';
      this.personId = null;
    }
  });
}

// Hey, this is a method
onSavePerson(form: NgForm) {
        if (form.invalid) {
          return;
      }
      if (this.mode === 'add') {
        this.peopleService.addPerson(form.value.name, form.value.title);
      } else {
        this.peopleService.updatePerson(
          this.personId,
          form.value.name,
          form.value.role
        );
      }
      form.resetForm();

      this.peopleService.addPerson(form.value.name, form.value.role);
        form.resetForm();
      }
}
