import { Component, OnInit, Input } from '@angular/core';
import {AfterViewInit, ViewChild} from '@angular/core';
import {SidebarComponent} from './sidebar/sidebar.component';
import {TimelineServiceService} from './timeline-service.service';
import { HTTPService } from './Services-Project/http.service';

@Component({
  selector: 'app-project-container',
  templateUrl: './project-container.component.html',
  styleUrls: ['./project-container.component.css'],
})
export class ProjectContainerComponent implements OnInit {


  public timeLineLocation: TimeLineLocation = 0;
  constructor(private timelineService: TimelineServiceService) {
  }

  ngOnInit() {
  }

  onClicked(button: number) {
    this.timeLineLocation = button;
    console.log(this.timeLineLocation);
    this.timelineService.changeStage(button);
  }


}



export enum TimeLineLocation {
  Definitie, Structuur, Ontwerp, Uitwerking, Uitvoering, Oplevering, Exploitatie, test1, test2
}
