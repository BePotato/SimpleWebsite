import { Injectable, Input } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs'
import { Observable, throwError } from 'rxjs';
import { stringify } from 'querystring';
import { HttpHeaders } from '@angular/common/http';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';
import { catchError } from 'rxjs/operators';
import { IPhase, IPhaseList, PhasePUT, PhaseWithEntity } from '../phases/phases.component';
import { IStorey, IStoreyList, IStoreyWithProjectId, StoreyPUT, StoreyWithProjectId } from '../storeys/storeys.component';
import { IZone, IZonesList, ZonePUT, ZoneWithProjectId } from '../zones/zones.component';
import { IEntityWithEverythingList, INiveau1, INiveau1List, INiveau2, INiveau2List, INiveau3, INiveau3List, IRamingList, RamingPUT, RamingWithProjectId } from '../Definitie/raming/raming.component';
import { EntityWithId, IEntity, IEntityNoID, IentityPUT, IEntityWithId } from '../entiteiten/entiteiten.component';
import { FundWProjectId, IFund, IFundList, IFundPUT, IFundWProjectId } from '../Definitie/investeringskost/investeringskost.component';
import { ILogList } from '../wijzigingen/wijzigingen.component';

const httpOptions = {
  headers: new HttpHeaders()
  .set('Content-Type', 'application/json')
  .set('Access-Control-Allow-Origin', '*')
  .set('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS')
  .set('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token')
  .set('Access-Control-Allow-Credentials', 'true')
 }

@Injectable({
  providedIn: 'root'
})
export class HTTPService {

  private SERVER = "https://bouwdataapi20210116141357.azurewebsites.net/";
  //private SERVER = "https://localhost:44329/";
  constructor(private client: HttpClient) { }


  //GET FUNCTIONS
  GetProjectFromAPI = (projectId: number) => {
    return this.client.get<IProject>(this.SERVER+"Projects/" + projectId, httpOptions);
  }
  GetWholeProjectFromAPI = (ProjectId: number) => {
    return this.client.get<IProjectWithEntities>(this.SERVER+"Projects/"+ProjectId+"/All", httpOptions);
  }
  GetEntitiesFromProject = (ProjectId: number) => {
    return this.client.get<IEntity[]>(this.SERVER+"Projects/"+ProjectId+"/Entities", httpOptions);
  }
  GetEntitiesWithPhases = (ProjectId: number) => {
    return this.client.get<IEntityWithEverythingList>(this.SERVER+"Entities/All");
  }
  GetPhasesFromProject = (projectId: number) => {
    return this.client.get<IPhaseList>(this.SERVER+"Phases/All", httpOptions);
  }
  GetStoreysFromProject = (projectId: number) => {
    return this.client.get<IStoreyList>(this.SERVER+"Storeys/", httpOptions);
  }
  GetZonesFromProject = (projectId: number) => {
    return this.client.get<IZonesList>(this.SERVER+"Zones/", httpOptions);
  }
  GetRamingenFromProject = (projectId: number) => {
    return this.client.get<IRamingList>(this.SERVER+"Raming/", httpOptions);
  }
  GetNiveau1s = () => {
    return this.client.get<INiveau1List>(this.SERVER+"Niveau1s/Code/Projects/1", httpOptions);
  }
  GetNiveau2s = (code: string) => {
    return this.client.get<INiveau2List>(this.SERVER+"Niveau2s/Code/"+code+"/Projects/1", httpOptions);
  }
  GetNiveau3s = (code: string) => {
    return this.client.get<INiveau3List>(this.SERVER+"Niveau3s/Code/"+code+"/Projects/1", httpOptions);
  }
  GetFundingFromProject = (projectId: number) => {
    return this.client.get<IFundList>(this.SERVER+"Funding/Project/"+projectId);
  }
  GetLogsFromProject = (projectID: number) => {
    console.log("gettingLogs");
    return this.client.get<ILogList>(this.SERVER+"Logs");
  }

  //POST FUNCTIONS
  AddEntityToProject = (entity: EntityWithId, ProjectId: number): Observable<EntityWithId> => {
    console.log(ProjectId);
    const body = JSON.stringify(entity);
    console.log(body);
    console.log(this.SERVER+"Entities");
    return this.client.post<EntityWithId>(this.SERVER+"Entities", entity, httpOptions).pipe(catchError(this.handleError));
  }
  AddPhaseToProject = (phase: PhaseWithEntity): Observable<PhaseWithEntity> => {
    console.log(phase);
    return this.client.post<PhaseWithEntity>(this.SERVER+"Phases", phase, httpOptions).pipe(catchError(this.handleError));
  }
  AddStoreyToProject = (storey: IStoreyWithProjectId) => {
    return this.client.post<ZoneWithProjectId>(this.SERVER+"Storeys", storey, httpOptions).pipe(catchError(this.handleError));
  }
  AddZoneToProject = (zone: ZoneWithProjectId): Observable<ZoneWithProjectId> => {
    const body = JSON.stringify(zone);
    return this.client.post<ZoneWithProjectId>(this.SERVER+"Zones", zone, httpOptions).pipe(catchError(this.handleError));
  }
  AddRamingToProject = (raming: RamingWithProjectId): Observable<RamingWithProjectId> => {
    const body = JSON.stringify(raming);
    console.log(raming);
    return this.client.post<RamingWithProjectId>(this.SERVER+"Raming", raming, httpOptions).pipe(catchError(this.handleError));
  }
  AddFundToProject = (fund: IFundWProjectId): Observable<FundWProjectId> => {
    const body = JSON.stringify(fund);
    return this.client.post<IFundWProjectId>(this.SERVER+"Funding", fund, httpOptions).pipe(catchError(this.handleError));
  }

  //DELETE FUNCTIONS
  DeleteEntityFromProject = (entityId: number) => {
    return this.client.delete<IEntity>(this.SERVER+"Entities/"+entityId);
  }
  DeletePhaseFromProject = (phaseId: number) => {
    return this.client.delete<IPhase>(this.SERVER+"Phases/"+phaseId);
  }
  DeleteZoneFromProject = (zoneId: number) => {
    return this.client.delete<IZone>(this.SERVER+"Zones/"+zoneId);
  }
  DeleteStoreyFromProject = (storeyId: number) => {
    return this.client.delete<IStorey>(this.SERVER+"Storeys/"+storeyId);
  }
  DeleteRamingFromProject = (ramingId: number) => {
    console.log(ramingId);
    return this.client.delete<IStorey>(this.SERVER+"Raming/"+ramingId);
  }
  DeleteFundsFromProject = (fundId: number) => {
    console.log(fundId);
    return this.client.delete<IFund>(this.SERVER+"Funding/"+fundId);
  }

  handleError(error: HttpErrorResponse): Observable<never>{
    console.log(error);
    return throwError(error.error);
    }

  ChangeStageOfProject = (stage: number, projectId: number) => {
    return this.client.put(this.SERVER+"Projects/"+projectId+"/ProjectFase/"+stage, httpOptions);
  }
  ChangeBudgetOfProject = (budget: number, projectId: number) => {
    return this.client.put(this.SERVER+"Projects/"+projectId+"/Budget/"+budget, httpOptions)
  }

  //PUT FUNCTIONS
  UpdateEntityOfProject = (entity:IentityPUT) => {
    const body =  JSON.stringify(entity);
    return this.client.put(this.SERVER+"Entities", body, httpOptions).pipe(catchError(this.handleError));
  }
  UpdatePhaseOfProject = (phase: PhasePUT) => {
    const body =  JSON.stringify(phase);
    return this.client.put(this.SERVER+"Phases", body, httpOptions).pipe(catchError(this.handleError));
  }
  UpdateStoreyOfProject = (storey: StoreyPUT) => {
    const body =  JSON.stringify(storey);
    return this.client.put(this.SERVER+"Storeys", body, httpOptions).pipe(catchError(this.handleError));
  }
  UpdateZoneOfProject = (zone: ZonePUT) => {
    const body = JSON.stringify(zone);
    return this.client.put(this.SERVER+"Zones", body, httpOptions).pipe(catchError(this.handleError));
  }
  UpdateFundsOfProject = (fund:IFundPUT) => {
    const body = JSON.stringify(fund);
    return this.client.put(this.SERVER+"Funding", body, httpOptions).pipe(catchError(this.handleError));
  }
  UpdateRamingOfProject = (raming: RamingPUT) => {
    const body = JSON.stringify(raming);
    return this.client.put(this.SERVER+"Raming", body, httpOptions).pipe(catchError(this.handleError));
  
  }
  



}

export interface IProject {
  "projectFase": string;
  "projectnaam": string;
  "id": number;
  "budget": number;
}
export interface IProjectWithEntities {
  stage: string;
  projectnaam: string;
  entities: IEntity[];
  id: number;
}
export class ProjectWithEntities implements IProjectWithEntities {
  stage: string;
  projectnaam: string;
  entities: IEntity[];
  id: number;
}


export interface IEntityWithProjectID {
  entity: IEntityNoID;
  projectId: number;
}
export class EntityWithProjectID implements IEntityWithProjectID {
  constructor(entity: IEntityNoID, Id: number ){
    this.entity = entity;
    this.projectId = Id;
  }
  entity: IEntityNoID;
  projectId: number;
}
export class EntityPromise {
  code: string;
  name: string;
  description: string;
}

export class Project implements IProject {
  "projectFase": string;
  "projectnaam": string;
  "id": number;
  "budget": number;
}




export interface IProjectWithEverything {
  stage: string;
  projectnaam: string;
  entities: IEntity[];
  storeys: IStorey[];
  phases: IPhase[];
  zones: IZone[];
  id: number;
}

export interface IEntityWithEverything {
  name: string;
  code: string;
  description: string;
  entityId: number;
  phases: IPhase[];
}

export interface IPhaseWithEverything {
  entity: IEntity;
  phaseCode: string;
  phaseName: string;
  phaseId: number;
}

export interface IStoreyWithEverything {
  storeyId: number;
  verdieping: string;
  code: string;
}
export interface IZoneWithEverything {
  gebruiksfunctie: string;
  code: string;
  zoneId: number;
}