import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

import { Project } from './project.model';
import { storeCleanupWithContext } from '@angular/core/src/render3/instructions';
import { stringify } from 'querystring';

@Injectable({providedIn: 'root'})
export class ProjectsService {
  private projects: Project[] = [];
  private projectsUpdated = new Subject<Project[]>();

  // Allowing for the injection of the Angular http client into this service.  So to inject, use constructor
  constructor(private http: HttpClient) {}

  // Set of methods.
  getProjects() {
    this.http.get<{ message: string, projects: Project[]}>('http://localhost:3000/api/projects')
      .subscribe((projectData) => {
        this.projects = projectData.projects;
        this.projectsUpdated.next([...this.projects]);
      });
  }

  getProjectsUpdatedListener() {
    return this.projectsUpdated.asObservable();
  }

  addProject(title: string, lead: string, dateDue: string) {
    const project: Project = {
      id: null,
      title: title,
      lead: lead,
      dateDue: dateDue
    };
    this.projects.push(project);
    this.projectsUpdated.next([...this.projects]);

  }
}
