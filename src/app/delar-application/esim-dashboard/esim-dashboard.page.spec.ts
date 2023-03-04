import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimDashboardPage } from './esim-dashboard.page';

describe('EsimDashboardPage', () => {
  let component: EsimDashboardPage;
  let fixture: ComponentFixture<EsimDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
