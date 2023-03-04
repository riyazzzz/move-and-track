import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimCaRequestPage } from './esim-ca-request.page';

describe('EsimCaRequestPage', () => {
  let component: EsimCaRequestPage;
  let fixture: ComponentFixture<EsimCaRequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimCaRequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimCaRequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
