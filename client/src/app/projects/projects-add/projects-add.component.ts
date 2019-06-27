import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap } from '@angular/router';

import { ProjectsService } from '../projects.service';
import { Project } from '../project.model';
import { mimeType } from './mime-type.validator';

@Component({
  selector: 'app-projects-add',
  templateUrl: './projects-add.component.html',
  styleUrls: ['./projects-add.component.scss']
})
export class ProjectsAddComponent implements OnInit {
  // Property set
  enteredTitle = '';
  enteredLead = '';
  enteredDueOn = '';
  project: Project;
  isLoading = false;
  form: FormGroup;
  imagePreview: string;
  private mode = 'addProject';
  private projectId: string;


  constructor(
    public projectsService: ProjectsService,
    public route: ActivatedRoute
    ) {}

  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required]
      }),
      lead: new FormControl(null, {
       validators: [Validators.required]
      }),
      dueOn : new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required],
        asyncValidators: [mimeType]
      })
    });
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('projectId')) {
        this.mode = 'edit';
        this.projectId = paramMap.get('projectId');
        this.isLoading = true;
        this.projectsService.getProject(this.projectId).subscribe(projectData => {
          this.isLoading = false;
          this.project = {
            id: projectData._id,
            title: projectData.title,
            lead: projectData.lead,
            dueOn: projectData.dueOn,
            imagePath: projectData.imagePath
          };
          this.form.setValue({
            title: this.project.title,
            lead: this.project.lead,
            dueOn: this.project.dueOn,
            image: this.project.imagePath
          });
        });
      } else {
        this.mode = 'addProject';
        this.projectId = null;
      }
    });
  }

  onImagePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get('image').updateValueAndValidity();
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result as string;
    };
    reader.readAsDataURL(file);
  }

  onAddProject () {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === 'addProject') {
    this.projectsService.addProject(
      this.form.value.title,
      this.form.value.lead,
      this.form.value.dueOn,
      this.form.value.image
      );
    } else {
      this.projectsService.updateProject(
        this.projectId,
        this.form.value.title,
        this.form.value.lead,
        this.form.value.dueOn,
        this.form.value.image
        );
    }
    this.form.reset();
  }

}
