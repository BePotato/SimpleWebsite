import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CostControlComponent } from './cost-control.component';

describe('CostControlComponent', () => {
  let component: CostControlComponent;
  let fixture: ComponentFixture<CostControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CostControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CostControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
