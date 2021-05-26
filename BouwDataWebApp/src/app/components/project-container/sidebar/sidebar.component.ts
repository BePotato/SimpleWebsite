import { Component, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { TimeLineLocation } from '../project-container.component';
import { TimelineServiceService} from 'src/app/components/project-container/timeline-service.service';
import { Subscription} from 'rxjs';
import { ProjectServiceService} from '../project-service.service'
import {SetLanguageService} from 'src/app/Services/set-language.service';

import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateCacheModule, TranslateCacheSettings, TranslateCacheService } from 'ngx-translate-cache';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  public href:string = "";
  public links:string [];
  public menuItems: string [];

  public DefinitieItems: string [] = ["Overzicht", "Initiele Investeringskost", "[E\]Entiteiten", "[P\]Phases", "[S]Storeys", "[Z\]Zones", "Raming"/*, "Cost Control"*/, "Brondocumenten", "Wijzigingen"];
  public DefinitieLinks: string [] = ["Overzicht", "Investeringskost", "Entiteiten", "Phases", "Storeys", "Zones", "Raming"/*, "CostControl"*/, "Brondocumenten", "Wijzigingen"]

  public StructuurItems: string [] = ["Overzicht", "[E\]Entiteiten", "[P\]Phases", "[S]Storeys", "[Z\]Zones", "Budget", "Cost Control", "Brondocumenten", "Wijzigingen" ];
  public StructuurLinks: string [] = ["Overzicht", "Entiteiten", "Phases", "Storeys", "Zones", "Budget", "CostControl", "Brondocumenten", "Wijzigingen" ]

  public OntwerpItems: string[] = ["Overzicht", "[E\]Entiteiten", "[P\]Phases", "[S]Storeys", "[Z\]Zones","[B\]Built Spaces", "Cost Control", "Omgevingsvergunning", "Subsidiedossier", "Brondocumenten", "Wijzigingen"];
  public OntwerpLinks: string[] = ["Overzicht", "Entiteiten", "Phases", "Storeys", "Zones", "BuiltSpaces", "CostControl", "Omgevingsvergunning", "Brondocumenten", "Wijzigingen"]

  public UitwerkingItems: string[] = ["Overzicht", "Aannemers", "Cost Control", "Brondocumenten", "Wijzigingen"];
  public UitwerkingLinks: string[] = ["Overzicht", "Aannemers", "CostControl", "Brondocumenten", "Wijzigingen"];

  public UitvoeringItems: string[] = ["Overzicht", "Aannemers", "Masterplanning", "Cost Control", "Brondocumenten", "Wijzigingen"];
  public UitvoeringLinks: string[] = ["Overzicht", "Aannemers", "Masterplanning", "CostControl", "Brondocumenten", "Wijzigingen"];

  public OpleveringItems: string[] = ["Overzicht", "Totale kosten", "Brondocumenten", "Wijzigingen"];
  public OpleveringLinks: string[] = ["Overzicht", "Totalekosten", "Brondocumenten", "Wijzigingen"];

  public ExploitatieItems: string[] = ["Overzicht", "Totale kosten", "Brondocumenten", "Wijzigingen"];
  public ExploitatieLinks: string[] = ["Overzicht", "Totalekosten", "Brondocumenten", "Wijzigingen"];

  public ProjectNaam: string;
  message:string;
  actualLanguage:string;
  @Input() timeLineLocation: TimeLineLocation = 0;


  constructor(private router: Router,
    private timelineService: TimelineServiceService,
    private projectService: ProjectServiceService,
    private languageSrv: SetLanguageService,
    public translate: TranslateService,
    translateCacheService: TranslateCacheService) {
      this.UpdateLanguage(translate.currentLang);
  }

  UpdateLanguage(language){

    console.log("currentLang:" + this.translate.currentLang);
    console.log("MenuLang:" + language);
    if (language == "xx"){
      this.actualLanguage = this.translate.currentLang;
    }
    else{
      this.actualLanguage = language;
    }
    if (this.actualLanguage == "fr") {
       this.DefinitieItems = ["Aperçu", "Frais d'investissement initial", "[E\]Entités", "[P\]Phases", "[S]Étages", "[Z\]Zones", "Estimation"/*, "Contrôle des frais"*/, "Documents source", "Modifications"];
       this.StructuurItems = ["Aperçu", "[E\]Entités", "[P\]Phases", "[S]Étages", "[Z\]Zones", "Budget", "Contrôle des frais", "Documents source", "Modifications" ];
       this.OntwerpItems = ["Aperçu", "[E\]Entités", "[P\]Phases", "[S]Étages", "[Z\]Zones","[B\]Espaces construit", "Contrôle des frais", "Permis d'environnement", "Dossier de subvention", "Documents source", "Modifications"];
       this.UitwerkingItems = ["Aperçu", "entrepreneurs", "Contrôle des frais", "Documents source", "Modifications"];
       this.UitvoeringItems = ["Aperçu", "entrepreneurs", "Masterplanning", "Contrôle des frais", "Documents source", "Modifications"];
       this.OpleveringItems = ["Aperçu", "Coût total", "Documents source", "Modifications"];
       this.ExploitatieItems = ["Aperçu", "Coût total", "Documents source", "Modifications"];
    }
    else {
      this.DefinitieItems = ["Overzicht", "Initiele Investeringskost", "[E\]Entiteiten", "[P\]Phases", "[S]Storeys", "[Z\]Zones", "Raming"/*, "Cost Control"*/, "Brondocumenten", "Wijzigingen"];
      this.StructuurItems = ["Overzicht", "[E\]Entiteiten", "[P\]Phases", "[S]Storeys", "[Z\]Zones", "Budget", "Cost Control", "Brondocumenten", "Wijzigingen" ];
      this.OntwerpItems = ["Overzicht", "[E\]Entiteiten", "[P\]Phases", "[S]Storeys", "[Z\]Zones","[B\]Built Spaces", "Cost Control", "Omgevingsvergunning", "Subsidiedossier", "Brondocumenten", "Wijzigingen"];
      this.UitwerkingItems = ["Overzicht", "Aannemers", "Cost Control", "Brondocumenten", "Wijzigingen"];
      this.UitvoeringItems = ["Overzicht", "Aannemers", "Masterplanning", "Cost Control", "Brondocumenten", "Wijzigingen"];
      this.OpleveringItems = ["Overzicht", "Totale kosten", "Brondocumenten", "Wijzigingen"];
      this.ExploitatieItems = ["Overzicht", "Totale kosten", "Brondocumenten", "Wijzigingen"];
    }
    this.ConstructSidebar();
  }

  ConstructSidebar() {
    this.menuItems = [];
    this.links = [];
    if (this.timeLineLocation==0) {
      this.menuItems = this.DefinitieItems;
      this.DefinitieLinks.forEach(element => {
        this.links.push("/Project/Preparation&Brief/" + element);
      });
    }
    else if (this.timeLineLocation==1) {
      this.menuItems = this.StructuurItems;
      this.StructuurLinks.forEach(element => {
        this.links.push("/Project/ConceptDesign/" + element);
      });
    }
    else if (this.timeLineLocation==2) {
      this.menuItems = this.OntwerpItems;
      this.OntwerpLinks.forEach(element => {
        this.links.push("/Project/SpatialCoordination/" + element);
      });
    }
    else if (this.timeLineLocation==3) {
      this.menuItems = this.UitwerkingItems;
      this.UitwerkingLinks.forEach(element => {
        this.links.push("/Project/TechnicalDesign/" + element);
      });
    }
    else if (this.timeLineLocation==4) {
      this.menuItems = this.UitvoeringItems;
      this.UitvoeringLinks.forEach(element => {
        this.links.push("/Project/Manufacturing&Construction/" + element);
      });
    }
    else if (this.timeLineLocation==5) {
      this.menuItems = this.OpleveringItems;
      this.OpleveringLinks.forEach(element => {
        this.links.push("/Project/Handover/" + element);
      });
    }
    else if (this.timeLineLocation==6) {
      this.menuItems = this.ExploitatieItems;
      this.ExploitatieLinks.forEach(element => {
        this.links.push("/Project/InUse/" + element);
      });
    }

  }

  ngOnInit() {
    this.timelineService.currentStage.subscribe(stage => console.log(stage, this.logChange(stage)));
    this.languageSrv.currentMessage.subscribe(message => this.UpdateLanguage(message))
    this.href = this.router.url;
    //console.log(this.router.url);
    this.ConstructSidebar();
    this.ProjectNaam = "TestProject";

  }

  logChange(stage: number) {
    this.timeLineLocation = stage;
    console.log(stage);
    this.href = this.router.url;
    this.ConstructSidebar();
  }

  Reload() {
    location.reload();
  }

}
