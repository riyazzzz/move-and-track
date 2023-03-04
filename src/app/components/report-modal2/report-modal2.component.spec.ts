import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportModal2Component } from './report-modal2.component';

describe('ReportModal2Component', () => {
  let component: ReportModal2Component;
  let fixture: ComponentFixture<ReportModal2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportModal2Component ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportModal2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
