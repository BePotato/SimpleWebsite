import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable, of } from 'rxjs';
import { HTTPService } from '../Services-Project/http.service';

@Component({
  selector: 'app-wijzigingen',
  templateUrl: './wijzigingen.component.html',
  styleUrls: ['./wijzigingen.component.css']
})
export class WijzigingenComponent implements OnInit {

  public displayedColumns : string[] = [];
  dataSource = new MatTableDataSource<ILog>([]);
  stagesList: string[] = ["Project Definitie", "Structuur-ontwerp", "Ontwerp", "Uitwerking", "Uitvoering", "Oplevering", "Exploitatie" ];
  selectedValue: string;
  stage: number;
  

  constructor(private HTTP: HTTPService) { 
    this.displayedColumns = ['id', 'changes', 'date'];
  }

  public SaveStage() {
    console.log(this.selectedValue);
    this.stage = this.stagesList.indexOf(this.selectedValue);
    console.log(this.stage);
    this.HTTP.ChangeStageOfProject(this.stage, 1).subscribe(() => (location.reload()));
  }

  ngOnInit() {
    this.HTTP.GetLogsFromProject(1).subscribe((data: ILogList) => (this.dataSource.data = data.logVMs, console.log(data.logVMs)));
  }

  ConvertData(lijst: ILog[]): Observable<ILog[]> {
    let list = lijst;
    return of(list);
    }

}

export interface ILog {
  id: number;
  changes: string;
  timeStamp: Date;
}

export interface ILogList {
  logVMs: ILog[];
}