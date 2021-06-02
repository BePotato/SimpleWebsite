import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from'@angular/common/http';
import { MatInputModule,MatOptionModule, MatSelectModule, MatIconModule, MatFormFieldModule, MatSortModule} from '@angular/material';
import { MatTableModule } from '@angular/material/table'  ;
import { NgbModalModule, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from "ng-apexcharts";

//-- Spreadsheet code --
import { SpreadsheetAllModule } from '@syncfusion/ej2-angular-spreadsheet';
//-- ---------------- --

import { AppComponent } from './app.component';
import { HomeScreenComponent } from './components/home-screen/home-screen.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from "../environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFireStorageModule } from "@angular/fire/storage";
import { AngularFireDatabaseModule } from "@angular/fire/database";
import { ReactiveFormsModule } from "@angular/forms";
import { FirebaseExcelComponent } from './firebase-excel/firebase-excel.component';
import { AppUiModule } from './app-ui.module';
import { OverviewComponent } from './components/project-container/Definitie/overview/overview.component';
import { ProjectContainerComponent } from './components/project-container/project-container.component';
import { TimelineComponent } from './components/project-container/timeline/timeline.component';
import { SidebarComponent } from './components/project-container/sidebar/sidebar.component';
import { OverzichtComponent } from './components/project-container/Structuur/overzicht/overzicht.component';
import { BrondocumentenComponent } from './components/brondocumenten/brondocumenten.component';
import { ElearnerScreenComponent } from './components/elearner-screen/elearner-screen/elearner-screen.component';
import { InvesteringskostComponent } from './components/project-container/Definitie/investeringskost/investeringskost.component';
import { EntiteitenComponent } from './components/project-container/entiteiten/entiteiten.component';
import { PhasesComponent } from './components/project-container/phases/phases.component';
import { StoreysComponent } from './components/project-container/storeys/storeys.component';
import { ZonesComponent } from './components/project-container/zones/zones.component';
import { RamingComponent } from './components/project-container/Definitie/raming/raming.component';
import { CostControlComponent } from './components/project-container/cost-control/cost-control.component';
import { I18nModule } from './i18n/i18n.module';
import { SelectLanguageComponent } from './select-language/select-language.component';
import { WijzigingenComponent } from './components/project-container/wijzigingen/wijzigingen.component';
import { ElearnerOpleidingComponent } from './components/elearner-screen/opleiding/elearner-opleiding/elearner-opleiding.component';
import { DeletionService} from './components/project-container/Services-Project/deletion.service';
import { ConfirmDeleteComponent } from './components/project-container/Services-Project/confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeScreenComponent,
    FirebaseExcelComponent,
    OverviewComponent,
    ProjectContainerComponent,
    TimelineComponent,
    SidebarComponent,
    OverzichtComponent,
    BrondocumentenComponent,
    ElearnerScreenComponent,
    InvesteringskostComponent,
    EntiteitenComponent,
    PhasesComponent,
    StoreysComponent,
    ZonesComponent,
    RamingComponent,
    CostControlComponent,
    SelectLanguageComponent,
    WijzigingenComponent,
    ElearnerOpleidingComponent,
    ConfirmDeleteComponent

  ],
  imports: [
    BrowserModule,
    //-- Spreadsheet code --
    SpreadsheetAllModule,
    //-- ---------------- --
    AppUiModule,
    RouterModule.forRoot([ //Changed for readability//

      { path: "Home", component: HomeScreenComponent },
      { path: "Documents", component: FirebaseExcelComponent },
      { path: "Overzicht", component: OverviewComponent },
      { path: "Project", component: ProjectContainerComponent, children: [
        { path: "Preparation&Brief", children: [
          { path: "Overzicht", component: OverviewComponent },
          { path: "Investeringskost", component: InvesteringskostComponent },
          { path: "Entiteiten", component: EntiteitenComponent },
          { path: "Phases", component: PhasesComponent },
          { path: "Storeys", component: StoreysComponent },
          { path: "Zones", component: ZonesComponent },
          { path: "Raming", component: RamingComponent },
          { path: "CostControl", component: CostControlComponent },
          { path: "Brondocumenten", component: FirebaseExcelComponent },
          { path: "Wijzigingen", component: WijzigingenComponent },
          { path: "", pathMatch: "full", redirectTo: "Overzicht"}
        ]},
        { path: "ConceptDesign", children: [
          { path: "Overzicht", component: OverviewComponent },
          { path: "Entiteiten", component: EntiteitenComponent },
          { path: "Phases", component: PhasesComponent },
          { path: "Storeys", component: StoreysComponent },
          { path: "Zones", component: ZonesComponent },
          { path: "Brondocumenten", component: FirebaseExcelComponent },
          { path: "", pathMatch: "full", redirectTo: "Overzicht"}
        ]},
        { path: "SpatialCoordination", children: [
          { path: "Overzicht", component: OverviewComponent },
          { path: "Entiteiten", component: EntiteitenComponent },
          { path: "Phases", component: PhasesComponent },
          { path: "Storeys", component: StoreysComponent },
          { path: "Zones", component: ZonesComponent },
          { path: "Brondocumenten", component: FirebaseExcelComponent },
          { path: "", pathMatch: "full", redirectTo: "Overzicht"}
        ]},
        { path: "TechnicalDesign", children: [
          {path: "Overzicht", component: OverviewComponent },
          { path: "Brondocumenten", component: FirebaseExcelComponent },
          { path: "", pathMatch: "full", redirectTo: "Overzicht"}
        ]},
        { path: "Manufacturing&Construction", children: [
          {path: "Overzicht", component: OverviewComponent },
          { path: "Brondocumenten", component: FirebaseExcelComponent },
          { path: "", pathMatch: "full", redirectTo: "Overzicht"}
        ]},
        { path: "Handover", children: [
          { path: "Overzicht", component: OverviewComponent },
          { path: "Brondocumenten", component: FirebaseExcelComponent },
          { path: "", pathMatch: "full", redirectTo: "Overzicht"}
        ]},
        { path: "InUse", children: [
          { path: "Overzicht", component: OverviewComponent },
          { path: "Brondocumenten", component: FirebaseExcelComponent },
          { path: "", pathMatch: "full", redirectTo: "Overzicht"}
        ]},
        { path: "", pathMatch: "full", redirectTo: "Preparation&Brief"}
      ]},
      { path: "Excel", component: FirebaseExcelComponent },
      { path: "elearner", component: ElearnerScreenComponent},
      { path: "elearner_opleiding", component: ElearnerOpleidingComponent},
      { path: "", pathMatch: "full", redirectTo: "Home" },
      { path: "*", redirectTo: "Home" }

    ]),
    BrowserAnimationsModule,

    //AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
    ReactiveFormsModule,
    I18nModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatOptionModule,
    MatSelectModule,
    HttpClientModule,
    MatTableModule,
    MatIconModule,
    MatSortModule,
    NgbModule,
    NgbModalModule,
    NgApexchartsModule

  ],
  providers: [
    DeletionService
  ],
  entryComponents: [
    ConfirmDeleteComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
