import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovementReportComponent } from './movement-report.component';

describe('MovementReportComponent', () => {
  let component: MovementReportComponent;
  let fixture: ComponentFixture<MovementReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovementReportComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovementReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
