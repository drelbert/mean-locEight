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
            dueOn: project.dueOn,
            id: project._id,
            imagePath: project.imagePath
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
    return this.http.get<{ _id: string, title: string, lead: string, dueOn: string, imagePath: string }>(
    'http://localhost:3000/api/projects/' + id);
  }


  addProject(title: string, lead: string, dueOn: string, image: File) {
    const projectData = new FormData();
    projectData.append('title', title);
    projectData.append('lead', lead);
    projectData.append('dueOn', dueOn);
    projectData.append('image', image, title);
    this.http
    .post<{ message: string, project: Project }>('http://localhost:3000/api/projects', projectData)
    .subscribe(responseData => {
      const project: Project = {
        id: responseData.project.id,
        title: title,
        lead: lead,
        dueOn: dueOn,
        imagePath: responseData.project.imagePath
      };
      this.projects.push(project);
      this.projectsUpdated.next([...this.projects]);
      this.router.navigate(['/addProject']);
    });
  }

  updateProject(id: string, title: string, lead: string, dueOn: string, image: File | string) {
   let projectData: Project | FormData;
    if (typeof(image) === 'object') {
      projectData = new FormData();
      projectData.append('id', id);
      projectData.append('title', title);
      projectData.append('lead', lead);
      projectData.append('dueOn', dueOn);
      projectData.append('image', image, title);
    } else {
       projectData = {
        id: id,
        title: title,
        lead: lead,
        dueOn: dueOn,
        imagePath: image
      };
    }
    this.http.put('http://localhost:3000/api/projects/' + id, projectData )
      .subscribe(response => {
        const updatedProjects = [...this.projects];
        const oldProjectIndex = updatedProjects.findIndex(p => p.id === id);
        const project: Project = {
          id: id,
          title: title,
          lead: lead,
          dueOn: dueOn,
          imagePath: ''
        };
        updatedProjects[oldProjectIndex] = project;
        this.projects = updatedProjects;
        this.projectsUpdated.next([...this.projects]);
        this.router.navigate(['/projects']);
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

