import { Component,
         OnInit
         } from '@angular/core';
import { NgForm } from '@angular/forms';

import { ProjectsService } from '../projects.service';


// Component decorator, imported above, for ng to use as component
// This is inJavascripot object form
@Component({
  selector: 'app-projects-add',
  templateUrl: './projects-add.component.html',
  styleUrls: ['./projects-add.component.scss']
})
export class ProjectsAddComponent implements OnInit {
  enteredTitle = '';
  enteredLead = '';
  enteredDateDue = '';

  constructor(public projectsService: ProjectsService) {}

  // The adding project method.
  onAddProject(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.projectsService.addProject(
      form.value.title,
      form.value.lead,
      form.value.dateDue);
      form.resetForm();
  }

  ngOnInit() {
  }

}
