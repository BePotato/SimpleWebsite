import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElearnerOpleidingComponent } from './elearner-opleiding.component';

describe('ElearnerOpleidingComponent', () => {
  let component: ElearnerOpleidingComponent;
  let fixture: ComponentFixture<ElearnerOpleidingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElearnerOpleidingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElearnerOpleidingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
