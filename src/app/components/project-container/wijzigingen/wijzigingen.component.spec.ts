import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WijzigingenComponent } from './wijzigingen.component';

describe('WijzigingenComponent', () => {
  let component: WijzigingenComponent;
  let fixture: ComponentFixture<WijzigingenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WijzigingenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WijzigingenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
