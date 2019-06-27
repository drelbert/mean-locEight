import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material';
import { Subscription } from 'rxjs';

import { Project } from '../project.model';
import { ProjectsService } from '../projects.service';
import { AuthService } from 'src/app/auth/auth.service';

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
totalProjects = 0;
projectsPerPage = 2;
currentPage = 1;
pageSizeOptions = [1, 2, 10];
userIsAuthenticated = false;
private projectsSub: Subscription;
private authStatusSub: Subscription;


// Adding a constructor for dependency injection from projects.service
constructor(public projectsService: ProjectsService, private authService: AuthService) {}

ngOnInit() {
  this.isLoading = true;
  this.projectsService.getProjects(this.projectsPerPage, this.currentPage);
  // Here is a listener to Subject in project.service
  this.projectsSub = this.projectsService
  .getProjectUpdateListener()
    .subscribe((projectData: {projects: Project[], projectCount: number}) => {
      this.isLoading = false;
      this.totalProjects = projectData.projectCount;
      this.projects = projectData.projects;
    });
    this.userIsAuthenticated = this.authService.getIsAuth();
    this.authStatusSub = this.authService
    .getAuthStatusListener()
    .subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    } );
 }


 onChangePage(pageData: PageEvent){
  this.isLoading = true;
  this.currentPage = pageData.pageIndex + 1;
  this.projectsPerPage = pageData.pageSize;
  this.projectsService.getProjects(this.projectsPerPage, this.currentPage);
 }

 onDelete(projectId: string) {
  this.isLoading = true;
  this.projectsService.deleteProject(projectId).subscribe(() => {
    this.projectsService.getProjects(this.projectsPerPage, this.currentPage);
  }, () => {
    this.isLoading = false;
  });
 }

 ngOnDestroy() {
   this.projectsSub.unsubscribe();
   this.authStatusSub.unsubscribe();
 }
}
