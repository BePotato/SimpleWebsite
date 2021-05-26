import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirebaseExcelComponent } from './firebase-excel.component';

describe('FirebaseExcelComponent', () => {
  let component: FirebaseExcelComponent;
  let fixture: ComponentFixture<FirebaseExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirebaseExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirebaseExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
