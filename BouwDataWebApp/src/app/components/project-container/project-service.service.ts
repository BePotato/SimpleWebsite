import { ANALYZE_FOR_ENTRY_COMPONENTS, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HTTPService, IProject, Project, ProjectWithEntities } from './Services-Project/http.service'

@Injectable({
  providedIn: 'root'
})
export class ProjectServiceService {

  Project: ProjectWithEntities = new ProjectWithEntities();
  Subscriptors: ISubscriber[];
  ProjectId: number;

  constructor(private HTTP: HTTPService) {

    this.Project.id = 1;
    this.Project.stage = "Preparation&Brief";
    this.ProjectId = 1;
    this.Project.projectnaam = "TestProject";
    this.Project.entities = [];
    this.HTTP.GetWholeProjectFromAPI(1).subscribe(result => {this.Project = result;});
  }
  GetProject() {
    return this.Project;
  }
  GetProjectId() {
    console.log(this.Project);
    return this.Project.id;
  }
  GetProjectStage() {
    return this.Project.stage;
  }
  GetProjectName() {
    return this.Project.projectnaam;
  }
  GetEntities() {
    return this.Project.entities;
  }


}


export interface ISubscriber {
  GetNotified();
  Subscribe();
  Loaded: boolean;
}

export class Subscriber {
  constructor(private projectService: ProjectServiceService) {
  }
  Subscribe() {
    this.projectService
  }
}

