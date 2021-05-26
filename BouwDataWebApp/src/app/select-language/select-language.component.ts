import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TimelineServiceService} from 'src/app/components/project-container/timeline-service.service';
import {SetLanguageService} from 'src/app/Services/set-language.service';
import { from} from 'rxjs';
@Component({
  selector: 'app-select-language',
  template: `
    <select #langSelect class="custom-select" style="width: 70px; font-weight: bold; background-color: #2b2c7e; color:white;" (change)="translate.use(langSelect.value);this.languageSrv.changeMessage(langSelect.value)">
      <option
        *ngFor="let lang of translate.getLangs()"
        [value]="lang"
        [attr.selected]="lang === translate.currentLang ? '' : null"
      >{{lang}}</option>
    </select>
  `,
})
export class SelectLanguageComponent implements OnInit {
  message:string;

  constructor(
    public translate: TranslateService,
    private timelineService: TimelineServiceService,
    public languageSrv:SetLanguageService) { }

  ngOnInit() {
    //this.languageSrv.currentMessage.subscribe(message => this.message = message)
  }

  //UpdateLanguage(){
  //  this.message = this.translate.currentLang;
  //  this.languageSrv.changeMessage(this.message);
  //}
}
