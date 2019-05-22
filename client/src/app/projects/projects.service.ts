import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';

import { Project } from './project.model';



@Injectable({providedIn: 'root'})
export class ProjectsService {
  private projects: Project[] = [];
  // Observables is objects that pass data around, here Subject
  // Emitting with this line
  private projectsUpdated = new Subject<Project[]>();

  constructor(private http: HttpClient, private router: Router) {}

    // Note ref type when copied is only copy of address
    // So need to use the spread operator to copy the array
  getProjects() {
    this.http
    .get<{ message: string; projects: any }>('http://localhost:3000/api/projects')
      .pipe(map((projectData) => {
        return projectData.projects.map(project => {
          return {
            title: project.title,
            lead: project.lead,
            dateDue: project.dateDue,
            id: project._id
          };
        });
      }))
      .subscribe((transformedProjects) => {
        this.projects = transformedProjects;
        this.projectsUpdated.next([...this.projects]);
      });
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

  getProject(id: string) {
    return this.http.get<{ _id: string, title: string, lead: string, dateDue: Date }>('http://localhost:3000/api/projects/' + id);
  }


  addProject(title: string, lead: string, dateDue: Date) {
    const project: Project = { id: null, title: title, lead: lead, dateDue: dateDue };
    this.http
    .post<{ message: string, projectId: string }>('http://localhost:3000/api/projects', project)
    .subscribe(responseData => {
      const id = responseData.projectId;
      project.id = id;
      this.projects.push(project);
      this.projectsUpdated.next([...this.projects]);
    });
  }

  updateProject(id: string, title: string, lead: string, dateDue: Date) {
    const project: Project = { id: id, title: title, lead: lead, dateDue: dateDue };
    this.http.put('http://localhost:3000/api/projects/' + id, project )
      .subscribe(response => {
        const updatedProjects = [...this.projects];
        const oldProjectIndex = updatedProjects.findIndex(p => p.id === project.id);
        updatedProjects[oldProjectIndex] = project;
        this.projects = updatedProjects;
        this.projectsUpdated.next([...this.projects]);
      });
  }

  deleteProject(projectId: string) {
    this.http.delete('http://localhost:3000/api/projects/' + projectId)
      .subscribe(() => {
       const updatedProjects = this.projects.filter(project => project.id !== projectId);
       this.projects = updatedProjects;
       this.projectsUpdated.next([...this.projects]);
      });
  }
}

