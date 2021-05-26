import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RamingComponent } from './raming.component';

describe('RamingComponent', () => {
  let component: RamingComponent;
  let fixture: ComponentFixture<RamingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RamingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RamingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
