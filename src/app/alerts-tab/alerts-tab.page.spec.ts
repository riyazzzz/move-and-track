import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertsTabPage } from './alerts-tab.page';

describe('AlertsTabPage', () => {
  let component: AlertsTabPage;
  let fixture: ComponentFixture<AlertsTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlertsTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlertsTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
