import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation, Inject, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { SpreadsheetComponent } from '@syncfusion/ej2-angular-spreadsheet';
import { Observable, of } from 'rxjs';
import { HTTPService, IProject, Project } from '../../Services-Project/http.service';
import { DeletionService } from '../../Services-Project/deletion.service';

@Component({
  selector: 'app-investeringskost',
  templateUrl: './investeringskost.component.html',
  styleUrls: ['./investeringskost.component.css']
})
export class InvesteringskostComponent implements OnInit {

  
  totalBudget: number;
  newBudget: number;
  newInvestment: string;
  public displayedColumns : string[] = [];
  Funds: IFund[];
  dataSource = new MatTableDataSource<IFund>([]);
  tempFunds: string;

  constructor(private HTTP: HTTPService, private deletionService: DeletionService) {
    this.displayedColumns = ['name', 'funds', 'edit', 'delete'];
  }

  SaveBudget() {
    var fund = new FundWProjectId();
    fund.funds = this.newBudget;
    fund.name = this.newInvestment;
    fund.projectId = 1;
    this.HTTP.AddFundToProject(fund).subscribe(() => (this.totalBudget = this.newBudget, 
    this.GetFunds()));
  }

  ngOnInit() {
    this.GetFunds();
    }

  GetFunds() {
    this.HTTP.GetFundingFromProject(1).subscribe((data) => (this.Funds = data.fundingVMs, 
      this.CalculateTotalBudget(data.fundingVMs),
      this.ConvertData(this.Funds).subscribe((data: IFund[]) => this.dataSource.data = data)));
  }

  ConvertData(lijst: IFund[]): Observable<IFund[]> {
    let list = lijst;
    return of(list);
    }

  addToTable(lijst: IFund[], extraItem: IFund): Observable<IFund[]> {
    let list = lijst;
    list.push(extraItem);
    return of(list);
  }

  CalculateTotalBudget(funds: IFund[]) {
    this.totalBudget = 0;
    funds.forEach(fund => {
      this.totalBudget = this.totalBudget + fund.funds;
      console.log(this.totalBudget);
    });

  }
  DeleteFund(fund: IFund) {
    this.HTTP.DeleteFundsFromProject(fund.id).subscribe(() => (this.GetFunds()));
   }
  confirmDelete(element){
    this.deletionService.confirm().then((confimed)=>{
      //here confirmed is true is user clicked oke and false if user clicks delete
      if(confimed == true){
        console.log("Item Deleted:")
        console.log(element);
        this.DeleteFund(element);
      }
      else{
        console.log("item not deleted");

      }
    }).catch(()=>{console.log("dismissed")});
  }
  changeEdit(element: IFund) {
    element.edit = !element.edit;
  }
  updateElement(element: IFund) {
    var newFunds = new FundPUT();
    newFunds.id = element.id;
    newFunds.funds = parseFloat(this.tempFunds);
    element.funds = parseFloat(this.tempFunds);
    console.log(newFunds);
    element.edit = false;
    this.CalculateTotalBudget(this.Funds);
    this.HTTP.UpdateFundsOfProject(newFunds).subscribe();
  }

}

export interface IFund {
  id: number;
  funds: number;
  name: string;
  edit: boolean;
}
export interface IFundWProjectId {
  funds: number;
  name: string;
  projectId: number;
}
export class Fund implements IFund
{
  id: number;
  funds: number;
  name: string;
  edit: boolean = false;
}
export class FundWProjectId {
  funds: number;
  name: string;
  projectId: number;
}
export interface IFundList {
  fundingVMs: IFund[];
}
export interface IFundPUT {
  id: number;
  funds: number;
}
export class FundPUT implements IFundPUT {
  id: number;
  funds: number;
}

