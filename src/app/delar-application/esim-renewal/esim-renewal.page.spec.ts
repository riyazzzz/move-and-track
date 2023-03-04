import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimRenewalPage } from './esim-renewal.page';

describe('EsimRenewalPage', () => {
  let component: EsimRenewalPage;
  let fixture: ComponentFixture<EsimRenewalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimRenewalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimRenewalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
