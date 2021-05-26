import { Component, OnInit } from '@angular/core';
// SyncfFusion Spreadsheet
import { ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { ApexLegend, ApexPlotOptions, ChartComponent } from "ng-apexcharts";
import {
  ApexAxisChartSeries,
  ApexNonAxisChartSeries,
  ApexResponsive,
  ApexChart,
  ApexXAxis,
  ApexFill
} from "ng-apexcharts";
import { Observable, of } from 'rxjs';
import { EntityWithDetails, EntityWithTotalRaming, IEntityWithDetails } from '../Definitie/overview/overview.component';
import { IEntityWithEverythingList, IRaming, IRamingList } from '../Definitie/raming/raming.component';
import { HTTPService, IEntityWithEverything, IProject } from '../Services-Project/http.service';
import { ILogList } from '../wijzigingen/wijzigingen.component';
// -----------------------

export type ChartOptions = {
  series: ApexNonAxisChartSeries;
  chart: ApexChart;
  responsive: ApexResponsive[];
  labels: any;
  legend: ApexLegend;
  plotOptions: ApexPlotOptions;
  xaxis: ApexXAxis;
  fill: ApexFill;
};
@Component({
  selector: 'app-cost-control',
  templateUrl: './cost-control.component.html',
  styleUrls: ['./cost-control.component.css']
})
export class CostControlComponent implements OnInit {
  Project: IProject;
  Entities: IEntityWithEverything[];
  Ramingen: IRaming[];

  
  EntitiesWithRamingen: IEntityWithDetails[] = [];
  EntitiesWithCalculatedRamingen: EntityWithTotalRaming[] = [];
  dataSource = new MatTableDataSource<IEntityWithDetails>([]);
  columnsToDisplay: string[] = ['code', 'name'];
  logColumnsToDisplay: string[] = ['date', 'id', 'changes' ];


  GotEntities: boolean = false;
  GotRamingen: boolean = false;

  public TotalRaming: number;
  public TotalBudget: number;
  expandedElement: IEntityWithDetails | null;

  @ViewChild("chart", {static: false}) chart: ChartComponent;
  public chartOptions: Partial<ChartOptions>;
  public chartOptions2: Partial<ChartOptions>;

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
  CheckAllDataReceived() {
    if (this.GotEntities && this.GotRamingen) {
      return true;
    }
    else return false;
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


  CreateChart() {
    let tempSeries: number[] = [];
    let tempLabels: string[] = [];
    this.EntitiesWithRamingen.forEach(element => {
      tempSeries.push(this.getTotalRamingForEntity(element));
      tempLabels.push(element.entity.name);
    });
    //Chart 1
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

}
