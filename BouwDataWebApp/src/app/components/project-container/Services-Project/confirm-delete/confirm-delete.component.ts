import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal} from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-confirm-delete',
  templateUrl: './confirm-delete.component.html',
  styleUrls: ['./confirm-delete.component.css']
})
export class ConfirmDeleteComponent implements OnInit {

  @Input() title: string;
  @Input() message: string;

  constructor(private activeModal: NgbActiveModal) { }

  public decline(){
    this.activeModal.close(false);
  }

  public accept(){
    this.activeModal.close(true);
  }

  public dismiss(){
    this.activeModal.dismiss();
  }
  ngOnInit() {
  }

}
