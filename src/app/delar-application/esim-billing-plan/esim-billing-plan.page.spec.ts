import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimBillingPlanPage } from './esim-billing-plan.page';

describe('EsimBillingPlanPage', () => {
  let component: EsimBillingPlanPage;
  let fixture: ComponentFixture<EsimBillingPlanPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimBillingPlanPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimBillingPlanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
