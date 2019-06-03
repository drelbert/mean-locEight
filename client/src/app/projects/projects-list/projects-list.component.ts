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

projects: Project[] = [];
private projectsSub: Subscription;

 constructor(public projectsService: ProjectsService) {}

 ngOnInit() {
  this.projectsService.getProjects();
  this.projectsSub = this.projectsService.getProjectsUpdatedListener()
    .subscribe((projects: Project[]) => {
      this.projects = projects;
    });
 }

 ngOnDestroy() {
   this.projectsSub.unsubscribe();
 }
}
