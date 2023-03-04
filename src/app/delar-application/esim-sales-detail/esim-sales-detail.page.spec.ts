import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimSalesDetailPage } from './esim-sales-detail.page';

describe('EsimSalesDetailPage', () => {
  let component: EsimSalesDetailPage;
  let fixture: ComponentFixture<EsimSalesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimSalesDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimSalesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
