import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvesteringskostComponent } from './investeringskost.component';

describe('InvesteringskostComponent', () => {
  let component: InvesteringskostComponent;
  let fixture: ComponentFixture<InvesteringskostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvesteringskostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvesteringskostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
