import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntiteitenComponent } from './entiteiten.component';

describe('EntiteitenComponent', () => {
  let component: EntiteitenComponent;
  let fixture: ComponentFixture<EntiteitenComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntiteitenComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntiteitenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
