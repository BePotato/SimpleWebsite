import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { HTTPService, IEntityWithEverything, IProjectWithEntities} from '../../Services-Project/http.service';
import { IStorey, IStoreyList } from '../../storeys/storeys.component';
import { IZone, IZonesList } from '../../zones/zones.component';
import { MatTableDataSource } from '@angular/material/table';
import { Observable, of } from 'rxjs';
import {MatSort} from '@angular/material/sort';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';
import { DeletionService } from '../../Services-Project/deletion.service';
import { IEntity } from '../../entiteiten/entiteiten.component';
import { IPhase } from '../../phases/phases.component';

@Component({
  selector: 'app-raming',
  templateUrl: './raming.component.html',
  styleUrls: ['./raming.component.css']
})
export class RamingComponent implements OnInit{

  public selectedNiv1: INiveau1;
  public selectedNiv2: INiveau2;
  public selectedNiv3: INiveau3;
  Niveau1List: INiveau1[];
  Niveau2List: INiveau2[];
  Niveau3List: INiveau3[];

  public entitiesWithEverything: IEntityWithEverything[];
  public entities: IEntityWithEverything[];
  public phases: IPhase[];
  public filterPhases: IPhase[]
  public zones: IZone[];
  public storeys: IStorey[];
  public niveau1s: INiveau1[];
  public ramingen: IRaming[];

  public selectedEntity: IEntity;
  public selectedPhase: IPhase;
  public selectedStorey: IStorey;
  public selectedZone: IZone;
  public newHoeveelheid: number;

  public displayedColumns : string[] = [];
  public totalSum: number;
  public PUTAmount: string;

  

  dataSource = new MatTableDataSource<IRaming>([]);
  @ViewChild(MatSort, {static: false}) sort: MatSort;
  public FilteredEntity: IEntity;
  public FilterValue = '';
  public FilteredPhase: IPhase;
  public FilteredStorey: IStorey;
  public FilteredZone: IZone;
  public FilteredNiveau1: INiveau1;
  public FilteredNiveau2: INiveau2;
  public FilteredNiveau3: INiveau3;
  public FilteredNiveau2List: INiveau2[];
  public FilteredNiveau3List: INiveau3[];

  constructor(private HTTP: HTTPService, private deletionService: DeletionService) {
    this.displayedColumns = ['entiteit', 'phase','storey', 'zone', 'name', 'aantal', 'kkg', 'raming', 'edit', 'delete'];
   }

  ngOnInit() {
    this.GetProject();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }


  SelectEntity() {
    var tempIndex = this.entities.findIndex(entity => entity.entityId == this.selectedEntity.entityId);
    this.phases = this.entities[tempIndex].phases;
  }

  SelectNiveau1() {
    this.HTTP.GetNiveau2s(this.selectedNiv1.code).subscribe((data: INiveau2List) => (this.Niveau2List = data.niveau2s));
  }
  SelectNiveau2() {
    this.HTTP.GetNiveau3s(this.selectedNiv2.code).subscribe((data: INiveau3List) => (console.log(data), this.Niveau3List = data.niveau3s));
  }

  GetProject() {
    this.HTTP.GetEntitiesWithPhases(1).subscribe((data: IEntityWithEverythingList) => (this.entities = data.entityVMs, console.log(data)));
    this.HTTP.GetStoreysFromProject(1).subscribe((data: IStoreyList) => (this.storeys = data.storeyVMs));
    this.HTTP.GetZonesFromProject(1).subscribe((data: IZonesList) => (this.zones = data.zoneVMs));
    this.HTTP.GetNiveau1s().subscribe((data: INiveau1List) => (this.Niveau1List = data.niveau1s))
    this.GetRamingen();  
  }
  ConvertData(lijst: IRaming[]): Observable<IRaming[]> {
    let list = lijst;
    return of(list);
  }
  GetRamingen() {
    this.HTTP.GetRamingenFromProject(1).subscribe((data: IRamingList) => (this.ramingen = data.ramingVMs, 
      console.log(data.ramingVMs),
      console.log(this.ramingen),
      this.ConvertData(this.ramingen).subscribe((data: IRaming[]) => (this.dataSource.data = data, this.getTotalSum()))));
  }


  SaveRaming() {
    var tempRaming = new RamingWithProjectId() ;
    console.log(this.newHoeveelheid);
    if(this.newHoeveelheid == undefined || this.newHoeveelheid == 0) { tempRaming.hoeveelheid = 1;}
    else {tempRaming.hoeveelheid = this.newHoeveelheid;}
    
    tempRaming.entities = (this.selectedEntity);
    tempRaming.phases = (this.selectedPhase);
    tempRaming.niveau1s = (this.selectedNiv1);
    tempRaming.niveau2s = (this.selectedNiv2);
    tempRaming.niveau3s = (this.selectedNiv3);
    tempRaming.storeys = (this.selectedStorey);
    tempRaming.zones = (this.selectedZone);
    tempRaming.projectId = 1;
    console.log(tempRaming);
    this.HTTP.AddRamingToProject(tempRaming).subscribe(() => (this.GetRamingen())); 
  }
  DeleteRaming(raming: IRaming) {
    this.HTTP.DeleteRamingFromProject(raming.ramingId).subscribe(() => (this.GetRamingen()));
   }
   confirmDelete(element){
    this.deletionService.confirm().then((confimed)=>{
      //here confirmed is true is user clicked oke and false if user clicks delete
      if(confimed == true){
        console.log("Item Deleted:")
        console.log(element);
        this.DeleteRaming(element);
      }
      else{
        console.log("item not deleted");

      }
    }).catch(()=>{console.log("dismissed")});
  }
  
  //Filtering Options
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.overWriteFilter();
    this.dataSource.filter = filterValue;
  }
  FilterEntity() {
    this.overWriteFilter();
    this.dataSource.filter = this.FilteredEntity.name.trim().toLowerCase();
    var tempIndex = this.entities.findIndex(entity => entity.entityId == this.FilteredEntity.entityId);
    console.log("index is "+tempIndex);
    this.filterPhases = this.entities[tempIndex].phases;
  }
  FilterPhase()
  {
    this.overWriteFilter();
    this.dataSource.filter = this.FilteredPhase.code.trim().toLowerCase();

  }
  FilterZone() {
    this.overWriteFilter();
    this.dataSource.filter = this.FilteredZone.code.trim().toLowerCase();;
  }
  FilterStorey() {
    this.overWriteFilter();
    this.dataSource.filter = this.FilteredStorey.code.trim().toLowerCase();;
  }
  FilterNiveau1() {
    this.overWriteFilter();
    console.log(this.dataSource);
    console.log(this.FilteredNiveau1);
    this.dataSource.filter = this.FilteredNiveau1.name.trim().toLowerCase();
    this.HTTP.GetNiveau2s(this.FilteredNiveau1.code).subscribe((data: INiveau2List) => (this.FilteredNiveau2List = data.niveau2s));
  }
  FilterNiveau2() {
    this.overWriteFilter();
    console.log(this.FilteredNiveau2.name.trim().toLowerCase())
    this.dataSource.filter = this.FilteredNiveau2.name.trim().toLowerCase();
    this.HTTP.GetNiveau3s(this.FilteredNiveau2.code).subscribe((data: INiveau3List) => (this.FilteredNiveau3List = data.niveau3s));
  }
  FilterNiveau3() {
    this.overWriteFilter();
    console.log(this.FilteredNiveau3.name.trim().toLowerCase())
    this.dataSource.filter = this.FilteredNiveau3.name.trim().toLowerCase();
  }





  ClearFilterValue() {
    this.FilterValue='';
    this.dataSource.filter = '';
  }

  overWriteFilter() {
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr =JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    }
  }
  nestedFilterCheck(search, data, key) {
    if (typeof data[key] === 'object') {
      for (const k in data[key]) {
        if (data[key][k] !== null) {
          search = this.nestedFilterCheck(search, data[key], k);
        }
      }
    } else {
      search += data[key];
    }
    return search;
  }

  getTotalSum() {
    return this.dataSource.filteredData.map(t => t.hoeveelheid*t.kkg).reduce((acc, value) => acc + value, 0);
  }



  changeEdit(element: IRaming) {
    element.edit = !element.edit;
  }

  updateElement(element: IRaming) {
    var newRaming= new RamingPUT();
    newRaming.ramingId= element.ramingId;
    if (this.PUTAmount == "") newRaming.hoeveelheid = element.hoeveelheid;
    else { newRaming.hoeveelheid= parseFloat(this.PUTAmount); element.hoeveelheid= parseFloat(this.PUTAmount); }
    element.edit = false;
    this.HTTP.UpdateRamingOfProject(newRaming).subscribe();
  }






  public Niveau1: string[] = [
    "A GRONDKOSTEN", "B INITIËLE BOUWKOSTEN", "C INITIËLE INRICHTINGSKOSTEN",
    "D BIJKOMENDE KOSTEN ONTWERP EN UITVOERING", "E ONVOORZIEN", "F BELASTINGEN",
    "G FINANCIERING", "X FACILITY PRODUCTS"
  ]
  public Niveau2: string[][] = [
    ["1 Inbreng grond (inclusief bestaande opstallen)", "A2 Sloopwerken - milieukosten", "A3 Infrastructurele voorzieningen"],
    ["1 Bouwkundige werken","2 Installaties","3 Vaste inrichtingen en voorzieningen", "4 Terrein","5 Algemene uitvoeringskosten/diversen"],
    ["1 Bedrijfsinstallaties", "2 Losse inrichtingen"],
    ["1 Bijkomende kosten grond", "2 Bijkomende kosten bouw", "3 Bijkomende kosten inrichting", "4 Aanloopkosten"],
    ["1 Onvoorzien"],
    ["1 Omzetbelasting", "2 Bijzondere belastingen"],
    ["1 Financieringskosten/rente (grond)", "G2 Financieringskosten/rente (bouw)"],
    ["1000 Space and Infrastructure", "2000 People and Organisation"]
  ]

  public Niveau3: string[][][] = [
    //A1
    [["A Grond (inclusief bestaande opstallen)","B Verwerving","C Belastingen en heffingen","D Bijdragen, vergoedingen en schadeloosstellingen","E Tijdelijke exploitatie/tijdelijk onderhoud"],
        //A2
        ["A Bouw(werk)","B Ondergronds"],
        //A3
        ["A Grondwerken", "B Verhardingen", "C Rioleringen", "D Groenaanleg", "E Nutsvoorzieningen", "F Kunstwerken", "G Bouw(werken)", "H Wettelijke verplichtingen"]],
    //B1
    [["A Fundering", "B Skelet", "C Dakafbouw/dakafwerking", "D Gevelafbouw/gevelafwerking", "E Binnenwandafbouw/binnenwandafwerking", "F Vloerafbouw/vloerafwerking binnen/buiten", "G Trappen en hellingbanen binnen/buiten", "H Plafonds binnen/buiten"],
        //B2
        ["A Werktuigbouw: vloeistof- en gasinstallaties", "B Werktuigbouw: klimaatinstallaties", "C Werktuigbouw: regelingen", "D Werktuigkundige brandveiligheid", "E Elektrotechniek: centraal", "F Elektrotechniek: decentraal energie", "G Elektrotechniek: decentraal signaal", "H Transport", "I Asset management systeem"],
        //B3
       ["A Vaste inrichtingen en voorzieningen"],
        //B4
        ["A Grondvoorzieningen", "B Opstallen (gebouwtjes, overkappingen enz.)", "C Omheining en afwerking", "D Installaties in het terrein", "E Terreininrichting"],
        //B5
        ["A Diversen (detaillering in ontwerpfase)", "B Algemene uitvoeringskosten (project)", "C Coördinatiekosten nevenaannemers", "D Algemene kosten/diversen", "E Winst en risico (bouwbedrijf)"]],
    //C1
    [["A Bedrijfsinstallaties", "B Bouwkundige werken t.b.v. bedrijfsinstallaties", "C Installaties t.b.v. bedrijfsinstallaties"],
        //C2
        ["A Inventaris", "B Bouwkundige werken t.b.v. losse inrichtingen", "C Installaties t.b.v. losse inrichtingen"]],
    //D1
    [["A Projectbegeleiding door de opdrachtgever", "B Honoraria (planontwikkeling en -begeleiding)", "C Heffingen", "D Verzekeringen", "E Risicoverrekening", "F Ontwikkelaarskosten", "G Verkoopkosten"],
        //D2
        ["A Projectbegeleiding door de opdrachtgever", "B Honoraria (planontwikkeling en -begeleiding)", "C Aansluitkosten", "D Heffingen", "E Verzekeringen", "F Risicoverrekening", "D Kunst", "H Ontwikkelaarskosten", "I Verkoopkosten"],
        //D3
        ["A Projectbegeleiding door de opdrachtgever", "B Honoraria (planontwikkeling en -begeleiding)", "C Heffingen", "D Verzekeringen", "E Risicoverrekening", "F Kunst", "G Ontwikkelaarskosten"],
        //D4
        ["A Bestuurskosten", "D4B Werving personeel", "C Vervroegde aanstellingen", "D Schoonmaken eerste oplevering", "E Verhuiskosten", "F Openingskosten", "G Leegstand", "H Tijdelijke huisvesting", "I Bedrijfskapitaal/kas"]],
    //E1A
    [["A Onvoorzien"]],
    //F1
    [["A Omzetbelasting binnenland", "B Omzetbelasting buitenland"],
        //F2
        ["A Andere belastingen"]],
    //G1
    [["A Grondrente"],
        //G2
        ["A Bouwrente"]],
    //X1
    [["100 Space", "200 Outdoors", "300 Cleaning", "400 Workplace", "900 Primary Activity Specific"],
        //X2
        ["100 Health, Safety, Security and Environment", "200 Hospitality", "300 ICT", "400 Logistics", "500 Business Support", "900 Organisation Specific"]]

  ]
}

export interface IEntityWithEverythingList {
  entityVMs: IEntityWithEverything[];
}
export interface INiveau1 {
  "niveau1Id": number,
  "name": string,
  "aantal": number,
  "toelichting": string,
  "sommatieSubtotaalNiveau2": number,
  "code": string
}
export interface INiveau1List {
  "niveau1s": INiveau1[]
}
export interface INiveau2 {
  "niveau1Id": number,
  "name": string,
  "sommatieSubtotaalNiveau3": number,
  "code": string
}
export interface INiveau2List {
  "niveau2s": INiveau2[]
}
export interface INiveau3 {
  "niveau2Id": number,
  "name": string,
  "sommatieSubtotaalNiveau4": number,
  "code": string
}
export interface INiveau3List {
  "niveau3s": INiveau3[]
}


export interface IRaming {
  "ramingId": number,
  "name": string,
  "hoeveelheid": number,
  "kkg": number,
  "toelichting": string,
  "storeyId": number,
  "zones": IZone,
  "phases": IPhase,
  "entities": IEntity,
  "storeys": IStorey,
  "niveau1s": INiveau1,
  "niveau2s": INiveau2,
  "niveau3s": INiveau3,
  edit: boolean
}
export interface IRamingList {
  "ramingVMs": IRaming[]
}

export interface IRamingWithProjectId {
  "name": string,
  "hoeveelheid": number,
  "toelichting": string,
  "storeyId": number,
  "zones": IZone,
  "phases": IPhase,
  "entities": IEntity,
  "storeys": IStorey,
  "niveau1s": INiveau1,
  "niveau2s": INiveau2,
  "niveau3s": INiveau3,
  "projectId": number
}
export class RamingWithProjectId implements IRamingWithProjectId {
  "name": string;
  "hoeveelheid": number;
  "toelichting": string;
  "storeyId": number;
  "zones": IZone;
  "phases": IPhase;
  "entities": IEntity;
  "storeys": IStorey;
  "niveau1s": INiveau1;
  "niveau2s": INiveau2;
  "niveau3s": INiveau3;
  "projectId": number;
}

export class RamingPUT {
  ramingId: number;
  hoeveelheid: number;
}