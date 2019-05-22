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
      isLoading = false;
      private mode = 'add';
      private personId: string;


      constructor(public peopleService: PeopleService, public route: ActivatedRoute) {}

      ngOnInit() {
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if (paramMap.has('personId')) {
            this.mode = 'edit';
            this.personId = paramMap.get('personId');
            this.isLoading = true;
            this.peopleService.getPerson(this.personId).subscribe(personData => {
              this.isLoading = false;
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
        this.peopleService.addPeople(form.value.name, form.value.role);
      } else {
        this.peopleService.updatePerson(this.personId, form.value.name, form.value.role);
      }
        form.resetForm();
      }
}
