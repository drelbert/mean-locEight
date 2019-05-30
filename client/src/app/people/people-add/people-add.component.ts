import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
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
      form: FormGroup;
      isLoading = false;
      private mode = 'add';
      private personId: string;


      constructor(public peopleService: PeopleService, public route: ActivatedRoute) {}

      ngOnInit() {
        this.form = new FormGroup({
          'name': new FormControl(null, {
            validators: [Validators.required, Validators.minLength(3)]
          }),
          'role': new FormControl(null, {
            validators: [Validators.required]
          })
        });
        this.route.paramMap.subscribe((paramMap: ParamMap) => {
          if (paramMap.has('personId')) {
            this.mode = 'edit';
            this.personId = paramMap.get('personId');
            this.isLoading = true;
            this.peopleService.getPerson(this.personId).subscribe(personData => {
              this.isLoading = false;
              this.person = {
                id: personData._id,
                name: personData.name,
                role: personData.role
              };
            this.form.setValue({
              'name': this.person.name,
              'role': this.person.role
             });
            });
          } else {
            this.mode = 'add';
            this.personId = null;
          }
        });
       }

// Hey, this is a method
      onSavePerson() {
        if (this.form.invalid) {
          return;
      }
      if (this.mode === 'add') {
        this.peopleService.addPeople(this.form.value.name, this.form.value.role);
      } else {
        this.peopleService.updatePerson(
          this.personId,
          this.form.value.name,
          this.form.value.role
          );
      }
      this.form.reset();
      }
}
