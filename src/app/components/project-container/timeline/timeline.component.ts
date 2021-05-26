import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { from } from 'rxjs';
import { TimeLineLocation } from '../project-container.component';
import { TimelineServiceService } from '../timeline-service.service';
import { HTTPService, IProject, Project } from '../Services-Project/http.service';
import { ProjectServiceService } from '../project-service.service'
@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.css']
})
export class TimelineComponent implements OnInit {

  StageInt: number;
  @Input() timeLineLocation: number = 0;
  msg:string;
  @Output() clicked = new EventEmitter<number>();

  private projectService: ProjectServiceService;
  Project: Project;

  constructor(private HTTP: HTTPService, pr: ProjectServiceService) {
    this.projectService = pr;
    //this.Project = this.projectService.GetProject();
    this.HTTP.GetProjectFromAPI(1).subscribe(result => {this.Project = result; this.Checkstage(this.Project);});
    if (this.Project == null) {this.StageInt = 0.07;}
    else {this.Checkstage(this.Project); }
  }
  
  ngOnInit() {
  }

  //This is needed to change the sidebar
  timelineClick(button:number) {
    this.msg=button + "pressed";
    this.clicked.emit(button);
    console.log(this.msg);
    return this.msg;
  }

  //Changes the timeline depending on the Projectstage
  Checkstage(project: IProject) {
    console.log(this.Project.projectFase);
    switch(this.Project.projectFase) {
      case "Project Definitie": {
        this.StageInt = 0.142857;
        break;
      }
      case "Structuur-ontwerp": {
        this.StageInt = 0.285714;
        break;
      }
      case "Ontwerp": {
        this.StageInt = 0.428571;
        break;
      }
      case "Uitwerking": {
        this.StageInt = 0.571428;
        break;
      }
      case "Uitvoering": {
        this.StageInt = 0.714285;
        break;
      }
      case "Oplevering": {
        this.StageInt = 0.857142;
        break;
      }
      case "Exploitatie": {
        this.StageInt = 1;
        break;
      }
      default: {
        this.StageInt = 0.07;
        break;
      }
    }
  }

}
