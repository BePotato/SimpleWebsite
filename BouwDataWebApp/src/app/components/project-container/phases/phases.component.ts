import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Observable, of } from 'rxjs';
import { HTTPService, Project, IProject, IProjectWithEntities } from '../Services-Project/http.service';
import { DeletionService} from '../Services-Project/deletion.service';
import { IEntity } from '../entiteiten/entiteiten.component';

@Component({
  selector: 'app-phases',
  templateUrl: './phases.component.html',
  styleUrls: ['./phases.component.css']
})
export class PhasesComponent implements OnInit {

  public displayedColumns : string[] = [];
  public selectedValue: IEntity;

  public newPhaseCode: string;
  public newPhaseToelichting: string;


  public Project: IProjectWithEntities;
  public entities: IEntity[] = [];
  public phases: IPhase[] = [];

  public PUTName = "";

  dataSource = new MatTableDataSource<IPhase>([]);

  constructor(private HTTP: HTTPService, private deletionService: DeletionService) {

  }

  ngOnInit() {
    this.displayedColumns = ['code', 'name','toelichting', 'edit', 'delete'];
    this.GetEntities();
    this.GetPhases();
  }

  /*doInitTable(lijst: Phase[]): Observable<Phase[]> {
    let list = lijst;
    return of(list);
  }*/

  SavePhase() {
    var tempPhase = new PhaseWithEntity();
    tempPhase.entityId = this.selectedValue.entityId;
    tempPhase.code = this.newPhaseCode;
    tempPhase.phaseName = this.newPhaseToelichting;
    tempPhase.projectId = 1;
    this.HTTP.AddPhaseToProject(tempPhase).subscribe(() => this.GetPhases());
  }
  DeletePhase(phase: IPhase) {
    console.log(phase);
    this.HTTP.DeletePhaseFromProject(phase.phaseId).subscribe(() => (this.GetPhases()));
  }
  /*addToTable(lijst: Phase[], extraItem: Phase): Observable<Phase[]> {

    let list = lijst;
    list.push(extraItem);
    return of(list);
  }*/
  GetEntities() {
    this.HTTP.GetWholeProjectFromAPI(1).subscribe((data: IProjectWithEntities) => (this.Project = data, this.entities = this.Project.entities)); //THIS IS THE HARDCODED WAY
  }
  confirmDelete(phase){
    this.deletionService.confirm().then((confimed)=>{
      //here confirmed is true is user clicked oke and false if user clicks delete
      if(confimed == true){
        console.log("Item Deleted")
        //Spreek delete methode aan
        this.DeletePhase(phase);
      }
      else{
        console.log("item not deleted");

      }
    }).catch(()=>{console.log("dismissed")});
  }

  GetPhases() {
  this.HTTP.GetPhasesFromProject(1).subscribe((data: IPhaseList) =>
  (this.phases = data.phaseVMs,
    this.ConvertData(this.phases).subscribe((data: IPhase[]) => (this.dataSource.data = data, console.log(this.phases)))));

  }
  ConvertData(lijst: IPhase[]): Observable<IPhase[]> {
  let list = lijst;
  return of(list);
  }

  changeEdit(element: IPhase) {
    element.edit = !element.edit;
  }
  updateElement(element: IPhase) {
    var newPhase= new PhasePUT();
    newPhase.code = element.code;
    newPhase.phaseId = element.phaseId;
    if (this.PUTName == "") newPhase.phaseName = element.phaseName;
    else { newPhase.phaseName = this.PUTName; element.phaseName = this.PUTName; }element.edit = false;
    this.HTTP.UpdatePhaseOfProject(newPhase).subscribe();
  }


}


export interface IPhaseList {
  phaseVMs: IPhase[];
}
export class PhaseWithEntity {
  entityId: number;
  code: string;
  phaseName: string;
  projectId: number;
}
export interface IPhase {
  phaseId: number;
  entity: IEntity;
  code: string;
  phaseName: string;
  edit: boolean;
}
export class PhasePUT {
  phaseId: number;
  phaseName: string;
  code: string;
}

