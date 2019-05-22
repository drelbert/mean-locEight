import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';

@Component({
  selector: 'app-projects-list',
  templateUrl: './projects-list.component.html',
  styleUrls: ['./projects-list.component.scss']
})
export class ProjectsListComponent implements OnInit, OnDestroy {
  // projects = [
   // { title: 'Raid The Death Star', dueDate: 'Jan 2, 2020', lead: 'Indra' },
   // { title: 'Recode Signal Droid', dueDate: 'May 5, 2020', lead: 'Rey' },
   // { title: 'Return Jaba\'s Money', dueDate: 'Dec 5, 2019', lead: 'Han' },
 // ];

projects: Project[] = [];
private projectsSub: Subscription;


// Adding a constructor for dependency injection from projects.service
constructor(public projectsService: ProjectsService) {}

ngOnInit() {
  this.projectsService.getProjects();
  // Here is a listener to Subject in project.service
  this.projectsSub = this.projectsService.getProjectUpdateListener()
    .subscribe((projects: Project[]) => {
      this.projects = projects;
    });
 }

 onDelete(projectId: string) {
  this.projectsService.deleteProject(projectId);
 }

 ngOnDestroy() {
   this.projectsSub.unsubscribe();
 }
}
