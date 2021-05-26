import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from 'rxjs'; 
import { TimeLineLocation } from './project-container.component';
import { HTTPService } from './Services-Project/http.service';

@Injectable({
  providedIn: 'root'
})
export class TimelineServiceService {

  private stage = new BehaviorSubject<TimeLineLocation>(0);
  currentStage = this.stage.asObservable();

  changeStage(stage: number) {
    this.stage.next(stage);
    console.log(stage);
  }
  
  constructor() { }
}


