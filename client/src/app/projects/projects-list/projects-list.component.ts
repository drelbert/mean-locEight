import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
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
isLoading = false;
totalProjects = 5;
projectsPerPage = 5;
pageSizeOptions = [1, 5, 10];
private projectsSub: Subscription;


// Adding a constructor for dependency injection from projects.service
constructor(public projectsService: ProjectsService) {}

ngOnInit() {
  this.isLoading = true;
  this.projectsService.getProjects();
  // Here is a listener to Subject in project.service
  this.projectsSub = this.projectsService.getProjectUpdateListener()
    .subscribe((projects: Project[]) => {
      this.isLoading = false;
      this.projects = projects;
    });
 }


 onChangePage(pageData: PageEvent){
   console.log(pageData);
 }

 onDelete(projectId: string) {
  this.projectsService.deleteProject(projectId);
 }

 ngOnDestroy() {
   this.projectsSub.unsubscribe();
 }
}
