import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSidenavModule, MatIconModule, MatButtonModule } from '@angular/material';


const uiModules = [
  MatSidenavModule,
  MatIconModule,
  MatButtonModule
];
@NgModule({
  imports: uiModules,
  exports: uiModules
})
export class AppUiModule { }
