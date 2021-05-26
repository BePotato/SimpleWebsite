import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@Injectable({
  providedIn: 'root',
})
export class DeletionService {

  constructor(private modalService: NgbModal) { }

  public confirm(title: string = "Confirm Deletion", message: string ="Are you sure you want to delete this item?", dialogSize: 'sm'|'lg' = 'sm'):Promise<boolean>{
    const modalRef = this.modalService.open(ConfirmDeleteComponent, {size: dialogSize, centered: true});
    modalRef.componentInstance.title = title;
    modalRef.componentInstance.message = message;
    return modalRef.result;
  }
  openModal(){

  }
}
