import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticularDashboardComponent } from './particular-dashboard.component';

describe('ParticularDashboardComponent', () => {
  let component: ParticularDashboardComponent;
  let fixture: ComponentFixture<ParticularDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParticularDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticularDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
