import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-elearner-opleiding',
  templateUrl: './elearner-opleiding.component.html',
  styleUrls: ['./elearner-opleiding.component.css']
})
export class ElearnerOpleidingComponent implements OnInit {

  NextDisabled: boolean = false;
  PreviousDisabled: boolean = true;

  PageOne: boolean = true;
  PageTwo: boolean = false;
  constructor() { }

  ngOnInit() {
  }

  NextPage(){
    this.PageOne = false;
    this.PageTwo = true;
  }

  PreviousPage(){
    this.PageOne= true;
    this.PageTwo= false;
  }
}
