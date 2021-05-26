import { Component, Input, OnInit ,ViewChild} from '@angular/core';
import { HTTPService, Project, IProject, IProjectWithEntities } from '../Services-Project/http.service';
import { ProjectServiceService } from '../project-service.service';
import {MatTableDataSource} from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { DeletionService} from '../Services-Project/deletion.service';



@Component({
  selector: 'app-entiteiten',
  templateUrl: './entiteiten.component.html',
  styleUrls: ['./entiteiten.component.css']
})
export class EntiteitenComponent implements OnInit {

  private projectService: ProjectServiceService;
  public ProjectId: number;
  public newEntityName: string;
  public newEntityCode: string;
  public newEntityDescription: string;
  public entities: IEntity[] = [];
  public displayedColumns : string[] = [];
  public Project: IProjectWithEntities;
  dataSource = new MatTableDataSource<IEntity>([]);

  public PUTName: string = "";
  public PUTDescription: string = "";

  constructor(private HTTP: HTTPService, ProjectService: ProjectServiceService, private deletionService: DeletionService) {
  this.projectService = ProjectService;
  }

  ngOnInit() {
    this.displayedColumns = ['code', 'name', 'description', 'raming', 'edit', 'delete'];
    this.GetEntities();
  }

  SaveEntity() {
    console.log("saving entity");
    var newEntity = new EntityWithId();

    newEntity.code = this.newEntityCode;
    newEntity.description = this.newEntityDescription;
    newEntity.name = this.newEntityName;
    newEntity.projectId = 1; //Hardcoded
    newEntity.phaseIds.push(0);
    this.HTTP.AddEntityToProject(newEntity, 1).subscribe((data: Object) => (this.GetEntities()));  //Hardcoded
    this.entities.push();
  }
  confirmDelete(element){
    this.deletionService.confirm().then((confimed)=>{
      //here confirmed is true is user clicked oke and false if user clicks delete
      if(confimed == true){
        console.log("Item Deleted")
        //Spreek delete methode aan
        this.deleteEntity(element)
      }
      else{
        console.log("item not deleted");
      }
    }).catch(()=>{console.log("dismissed")});
  }

  deleteEntity(entity: IEntity) {
    console.log()
    this.HTTP.DeleteEntityFromProject(entity.entityId).subscribe(() => (this.GetEntities()));
  }
  GetEntities() {
    this.HTTP.GetWholeProjectFromAPI(1).subscribe((data: IProjectWithEntities) =>
    (this.Project = data,
      this.entities = this.Project.entities,
      this.ConvertData(this.entities).subscribe((data: IEntity[]) => (this.dataSource.data = data)))); 
  }
  GetProjectId() {
    this.ProjectId = this.projectService.GetProjectId();
  }
  ConvertData(lijst: IEntity[]): Observable<IEntity[]> {
    let list = lijst;
    return of(list);
  }

  changeEdit(element: IEntity) {
    element.edit = !element.edit;
  }

  updateElement(element: IEntity) {
    var newEntity= new EntityPUT();
    newEntity.entityId = element.entityId;
    newEntity.code = element.code;
    if (this.PUTName == "") newEntity.name = element.name;
    else { newEntity.name = this.PUTName; element.name = this.PUTName; }
    if (this.PUTDescription == "") newEntity.description = element.description;
    else { newEntity.description = this.PUTDescription; element.description = this.PUTDescription; }
    element.edit = false;
    this.HTTP.UpdateEntityOfProject(newEntity).subscribe();
  }



}

export interface IEntityNoID {
  name: string;
  code: string;
  description: string;
}
export class EntityNoID implements IEntityNoID {
  name: string;
  code: string;
  description: string;
}
export class EntityWithId implements IEntityWithId {
  name: string;
  code: string;
  description: string;
  projectId: number;
  phaseIds: number[] = [];
}
export interface IEntityWithId {
  name: string;
  code: string;
  description: string;
  projectId: number;
}
export interface IEntity{
  name: string;
  code: string;
  description: string;
  entityId: number;
  edit: boolean;
}
export class Entity implements IEntity{
  name: string;
  code: string;
  description: string;
  entityId: number;
  edit: boolean = false;
}
export interface IentityPUT {
  entityId: number;
  code: string;
  description: string;
  name: string;
}
export class EntityPUT implements IentityPUT {
  entityId: number;
  code: string;
  description: string;
  name: string;
}
