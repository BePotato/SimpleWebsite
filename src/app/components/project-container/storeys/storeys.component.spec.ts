import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StoreysComponent } from './storeys.component';

describe('StoreysComponent', () => {
  let component: StoreysComponent;
  let fixture: ComponentFixture<StoreysComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreysComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StoreysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
