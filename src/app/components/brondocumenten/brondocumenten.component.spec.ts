import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrondocumentenComponent } from './brondocumenten.component';

describe('BrondocumentenComponent', () => {
  let component: BrondocumentenComponent;
  let fixture: ComponentFixture<BrondocumentenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrondocumentenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrondocumentenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
