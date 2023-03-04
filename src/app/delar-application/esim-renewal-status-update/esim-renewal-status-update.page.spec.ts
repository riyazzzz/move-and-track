import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimRenewalStatusUpdatePage } from './esim-renewal-status-update.page';

describe('EsimRenewalStatusUpdatePage', () => {
  let component: EsimRenewalStatusUpdatePage;
  let fixture: ComponentFixture<EsimRenewalStatusUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimRenewalStatusUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimRenewalStatusUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
