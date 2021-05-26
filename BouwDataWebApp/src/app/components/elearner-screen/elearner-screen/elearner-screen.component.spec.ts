import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ElearnerScreenComponent } from './elearner-screen.component';

describe('ElearnerScreenComponent', () => {
  let component: ElearnerScreenComponent;
  let fixture: ComponentFixture<ElearnerScreenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ElearnerScreenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ElearnerScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
