import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectsService } from '../projects.service';
import { Project } from '../project.model';


@Component({
  selector: 'app-projects-add',
  templateUrl: './projects-add.component.html',
  styleUrls: ['./projects-add.component.scss']
})
export class ProjectsAddComponent implements OnInit {
  enteredTitle = '';
  enteredLead = '';
  enteredDateDue = '';
  project: Project;
  private mode = 'addProject';
  private projectId: string;


  constructor(public projectsService: ProjectsService, public route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.mode = 'edit';
        this.projectId = paramMap.get('projectId');
        this.projectsService.getProject(this.projectId).subscribe(projectData => {
          this.project = { id: projectData._id, title: projectData.title, lead: projectData.lead, dateDue: projectData.dateDue };
        });
      } else {
        this.mode = 'addProject';
        this.projectId = null;
      }
    });
  }

  onAddProject(form: NgForm ) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'addProject') {
    this.projectsService.addProject(form.value.title, form.value.lead, form.value.dateDue);
    } else {
      this.projectsService.updateProject(this.projectId, form.value.title, form.value.lead, form.value.dateDue);
    }
    form.resetForm();
  }

}
