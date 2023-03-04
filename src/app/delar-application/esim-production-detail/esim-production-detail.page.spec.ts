import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimProductionDetailPage } from './esim-production-detail.page';

describe('EsimProductionDetailPage', () => {
  let component: EsimProductionDetailPage;
  let fixture: ComponentFixture<EsimProductionDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimProductionDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimProductionDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
