import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimAccountsMappingPage } from './esim-accounts-mapping.page';

describe('EsimAccountsMappingPage', () => {
  let component: EsimAccountsMappingPage;
  let fixture: ComponentFixture<EsimAccountsMappingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimAccountsMappingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimAccountsMappingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
