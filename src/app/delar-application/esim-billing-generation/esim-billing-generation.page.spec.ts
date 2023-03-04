import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimBillingGenerationPage } from './esim-billing-generation.page';

describe('EsimBillingGenerationPage', () => {
  let component: EsimBillingGenerationPage;
  let fixture: ComponentFixture<EsimBillingGenerationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimBillingGenerationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimBillingGenerationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
