import { Component, Input, OnInit } from '@angular/core';
import { HTTPService, Project } from '../Services-Project/http.service';
import { ProjectServiceService } from '../project-service.service';
import {MatTableDataSource} from '@angular/material/table';
import { Observable, of } from 'rxjs';
import { DeletionService } from '../Services-Project/deletion.service';


@Component({
  selector: 'app-storeys',
  templateUrl: './storeys.component.html',
  styleUrls: ['./storeys.component.css']
})
export class StoreysComponent implements OnInit {

  private projectService: ProjectServiceService;
  public ProjectId: number;
  public newStoreyCode: string = "";
  public newStoreyDescription: string;
  public storeys: IStorey[] = [];
  public displayedColumns : string[] = [];
  dataSource = new MatTableDataSource<IStorey>([]);

  public PUTName = "";
  public PUTCode = "";

  constructor(private HTTP: HTTPService, ProjectService: ProjectServiceService, private deletionService: DeletionService) {
    this.projectService = ProjectService;
    this.displayedColumns = ['code', 'description', 'edit', 'delete'];
    }

  ngOnInit() {
    this.GetStoreys();
  }
  SaveStorey() {
    var newStorey = new StoreyWithProjectId();
    if (this.newStoreyCode.length == 1) this.newStoreyCode = this.newStoreyCode + "0";
    while(this.newStoreyCode.length <= 2) {
      this.newStoreyCode = "0" + this.newStoreyCode;
    }
    newStorey.code = this.newStoreyCode;
    newStorey.verdieping = this.newStoreyDescription;
    newStorey.projectId = 1 //Hardcoded
    console.log(newStorey);
    this.HTTP.AddStoreyToProject(newStorey).subscribe(() => (this.GetStoreys()));
  }
  GetStoreys() {
    this.HTTP.GetStoreysFromProject(1).subscribe((data: IStoreyList) => (this.storeys = data.storeyVMs, 
      console.log(data),
      this.ConvertData(this.storeys).subscribe((data: IStorey[]) => (this.dataSource.data = data))));
  }
  confirmDelete(element){
    this.deletionService.confirm().then((confimed)=>{
      //here confirmed is true is user clicked oke and false if user clicks delete
      if(confimed == true){
        console.log("Item Deleted")
        this.DeleteStorey(element);
      }
      else{
        console.log("item not deleted");

      }
    }).catch(()=>{console.log("dismissed")});
  }

  DeleteStorey(storey: IStorey) {
    this.HTTP.DeleteStoreyFromProject(storey.storeyId).subscribe(() => (this.GetStoreys()));
  }

  ConvertData(lijst: IStorey[]): Observable<IStorey[]> {
    let list = lijst;
    return of(list);
    }

    changeEdit(element: IStorey) {
      element.edit = !element.edit;
    }
  
    updateElement(element: IStorey) {
      var newStorey= new StoreyPUT();
      newStorey.storeyId = element.storeyId
      if (this.PUTName == "") newStorey.verdieping = element.verdieping;
      else { newStorey.verdieping = this.PUTName; element.verdieping = this.PUTName; }
      if (this.PUTCode == "") newStorey.code = element.code;
      else { newStorey.code = this.PUTCode; element.code= this.PUTCode; }
      element.edit = false;
      this.HTTP.UpdateStoreyOfProject(newStorey).subscribe();
    }

}

export class IStoreyList {
  storeyVMs: IStorey[]
}

export interface IStorey{
  storeyId: number;
  verdieping: string;
  code: string;
  edit: boolean;
}

export interface IStoreyWithProjectId{
  verdieping: string;
  code: string;
  projectId: number;
}
export class StoreyWithProjectId implements IStoreyWithProjectId{
  verdieping: string;
  code: string;
  projectId: number;
}

export class StoreyPUT {
  storeyId: number;
  verdieping: string;
  code: string;
}
