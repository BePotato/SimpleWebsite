import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { MatSidenavModule, MatSort, MatTableDataSource } from '@angular/material';

import {animate, state, style, transition, trigger} from '@angular/animations';
import { HTTPService, IEntityWithEverything, IProject, IProjectWithEverything } from '../../Services-Project/http.service';
import { IEntityWithEverythingList, IRaming, IRamingList } from '../raming/raming.component';
import { Observable, of } from 'rxjs';
import { isNullOrUndefined } from 'util';
import { ILog, ILogList } from '../../wijzigingen/wijzigingen.component';
import {MatPaginator} from '@angular/material/paginator';
import { ChartComponent } from "ng-apexcharts";
import {
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart
} from "ng-apexcharts";

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
};

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class OverviewComponent implements OnInit {

  Project: IProject;
  Entities: IEntityWithEverything[];
  Ramingen: IRaming[];

  
  EntitiesWithRamingen: IEntityWithDetails[] = [];
  EntitiesWithCalculatedRamingen: EntityWithTotalRaming[] = [];
  dataSource = new MatTableDataSource<IEntityWithDetails>([]);
  columnsToDisplay: string[] = ['code', 'name'];
  logDataSource = new MatTableDataSource<ILog>([]);
  logColumnsToDisplay: string[] = ['date', 'id', 'changes' ];


  GotEntities: boolean = false;
  GotRamingen: boolean = false;

  public TotalRaming: number;
  public TotalBudget: number;
  expandedElement: IEntityWithDetails | null;

  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;

  constructor(private HTTP: HTTPService) { 
    //this.CreateChart();
  }
  

  ngOnInit() {
    this.HTTP.GetProjectFromAPI(1).subscribe((data: IProject) => (this.Project = data, this.TotalBudget = data.budget));
    this.HTTP.GetEntitiesWithPhases(1).subscribe((data: IEntityWithEverythingList) => (this.Entities = data.entityVMs,
       this.GotEntities = true,
       this.CreateTable()));
    this.HTTP.GetRamingenFromProject(1).subscribe((data: IRamingList)=> (this.Ramingen = data.ramingVMs,
      this.TotalRaming = this.GetTotalRaming(), 
      this.GotRamingen = true,
      this.CreateTable()));
      this.HTTP.GetLogsFromProject(1).subscribe((data: ILogList) => (this.logDataSource.data = data.logVMs, this.SortLogsByDate()));
  }
  
  
  GetTotalRaming() {
    var totalRaming = 0;
    this.Ramingen.forEach(element => {
      totalRaming = totalRaming + element.kkg*element.hoeveelheid;
    });
    return totalRaming;
  }

  ConvertData(lijst: IEntityWithDetails[]): Observable<IEntityWithDetails[]> {
    let list = lijst;
    return of(list);
  }

  CreateTable() {
    if (this.CheckAllDataReceived) {
      this.Entities.forEach(element => {
        var tempEntityWR = new EntityWithDetails();
        tempEntityWR.entity = element;

        this.Ramingen.forEach(raming => {
          if(raming.entities.entityId == element.entityId) {
            tempEntityWR.raming.push(raming);
          }

        });
        this.EntitiesWithRamingen.push(tempEntityWR);
      });
      this.ConvertData(this.EntitiesWithRamingen).subscribe((data: IEntityWithDetails[]) => (this.dataSource.data = data));
      this.CreateChart();
    }
  }
  CreateChart() {
    let tempSeries: number[] = [];
    let tempLabels: string[] = [];
    this.EntitiesWithRamingen.forEach(element => {
      tempSeries.push(this.getTotalRamingForEntity(element));
      tempLabels.push(element.entity.name);
    });
    
    this.chartOptions = {
      series: tempSeries,
      chart: {
        width: 380,
        type: "pie"
      },
      labels: tempLabels,
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200
            },
            legend: {
              position: "bottom"
            }
          }
        }
      ]
    };
  }


  CheckAllDataReceived() {
    if (this.GotEntities && this.GotRamingen) {
      return true;
    }
    else return false;
  }
  SortLogsByDate() {
    console.log(this.logDataSource.data);
    this.logDataSource.data.sort((a,b) => {
      if (a.timeStamp > b.timeStamp) {
        return -1;
    } else if (a.timeStamp < b.timeStamp) {
        return 1;
    } else {
        return 0;
    }
    })
    console.log(this.logDataSource.data);
    this.logDataSource.data = this.logDataSource.data.slice(0,5);
    console.log(this.dataSource.data);
  }

  getTotalRamingForEntity(entity: IEntityWithDetails) {
    var entityRaming = 0;
    entity.raming.forEach(raming => {
      entityRaming = entityRaming + raming.kkg*raming.hoeveelheid;
    })
    return entityRaming;
  }

  getMaxRamingOfEntities() {
    this.EntitiesWithCalculatedRamingen = [];
    this.EntitiesWithRamingen.forEach(Entity => {
      var tempEntity = new EntityWithTotalRaming();
      tempEntity.entity = Entity;
      tempEntity.totalRaming = this.getTotalRamingForEntity(Entity);
      this.EntitiesWithCalculatedRamingen.push(tempEntity);
    });
    this.EntitiesWithCalculatedRamingen.sort(function(a,b) {
      return a.totalRaming < b.totalRaming ? 1: -1;
    })
    return this.EntitiesWithCalculatedRamingen[0].entity.entity.name;
  }
  
}

export interface IEntityWithDetails {
  "entity": IEntityWithEverything;
  "raming": IRaming[];
}
export class EntityWithDetails implements IEntityWithDetails {
  "entity": IEntityWithEverything;
  "raming": IRaming[] = [];
}
export class EntityWithTotalRaming {
  "entity": IEntityWithDetails;
  "totalRaming": number;
}

