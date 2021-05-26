import { Component, Input, OnInit } from '@angular/core';
import { HTTPService, Project } from '../Services-Project/http.service';
import { ProjectServiceService } from '../project-service.service';
import { MatTableDataSource } from '@angular/material';
import { Observable, of } from 'rxjs';
import { DeletionService} from '../Services-Project/deletion.service';


@Component({
  selector: 'app-zones',
  templateUrl: './zones.component.html',
  styleUrls: ['./zones.component.css']
})
export class ZonesComponent implements OnInit {
  private projectService: ProjectServiceService;
  public ProjectId: number;
  public newZoneCode: string;
  public newZoneDescription: string;
  public newZoneRaming: string;
  public zones: IZone[] = [];
  public displayedColumns : string[] = [];
  dataSource = new MatTableDataSource<IZone>([]);

  public PUTName = "";
  public PUTCode = "";

  public DropdownList: string []= [];
  constructor(private HTTP: HTTPService, ProjectService: ProjectServiceService, private deletionService: DeletionService) {
    this.projectService = ProjectService;
    this.displayedColumns = ['code', 'description', 'raming', 'edit', 'delete'];
    }

  ngOnInit() {
    this.GetZones();
  }
  SaveZone() {
    var newZone = new ZoneWithProjectId();
    newZone.code = this.newZoneCode;
    newZone.gebruiksfunctie = this.newZoneDescription;
    newZone.projectId = 1 //Hardcoded
    console.log(newZone);
    this.HTTP.AddZoneToProject(newZone).subscribe(() => (this.GetZones()));
  }

  GetZones() {
    this.HTTP.GetZonesFromProject(1).subscribe((data: IZonesList) => (this.zones = data.zoneVMs, 
      console.log(data),
      this.ConvertData(this.zones).subscribe((data: IZone[]) => (this.dataSource.data = data))));
  }
  confirmDelete(element){
    this.deletionService.confirm().then((confimed)=>{
      //here confirmed is true is user clicked oke and false if user clicks delete
      if(confimed == true){
        console.log("Item Deleted:")
        console.log(element);
        this.DeleteZone(element);
      }
      else{
        console.log("item not deleted");

      }
    }).catch(()=>{console.log("dismissed")});
  }
  DeleteZone(zone: IZone) {
    console.log("Deleting zone with Id: " + zone.zoneId);
    this.HTTP.DeleteZoneFromProject(zone.zoneId).subscribe(() => (this.GetZones()));
  }
  addToTable(lijst: PeriodicElement[], extraItem: PeriodicElement): Observable<PeriodicElement[]> {
    let list = lijst;
    list.push(extraItem);
    return of(list);
  }

  ConvertData(lijst: IZone[]): Observable<IZone[]> {
    let list = lijst;
    return of(list);
    }

    changeEdit(element: IZone) {
      element.edit = !element.edit;
    }
  
    updateElement(element: IZone) {
      var newZone= new ZonePUT();
      newZone.zoneId = element.zoneId;
      if (this.PUTName == "") newZone.gebruiksfunctie = element.gebruiksfunctie;
      else { newZone.gebruiksfunctie= this.PUTName; element.gebruiksfunctie= this.PUTName; }
      if (this.PUTCode == "") newZone.code = element.code;
      else { newZone.code = this.PUTCode; element.code= this.PUTCode; }
      element.edit = false;
      this.HTTP.UpdateZoneOfProject(newZone).subscribe();
    }

}


export class IZonesList {
  zoneVMs: IZone[];
}

export interface PeriodicElement {
  description: string;
  code: string;
  dropdownlist: string;
  raming: number;
}
export interface IZone{
  gebruiksfunctie: string;
  code: string;
  zoneId: number;
  edit: boolean;
}
export interface IZoneWithProjectId {
  gebruiksfunctie: string;
  code: string;
  projectId: number;
}
export class ZoneWithProjectId implements IZoneWithProjectId {
  gebruiksfunctie: string;
  code: string;
  projectId: number;
}
export class ZonePUT {
  gebruiksfunctie: string;
  code: string;
  zoneId: number;
}
