import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimDealerDetailPage } from './esim-dealer-detail.page';

describe('EsimDealerDetailPage', () => {
  let component: EsimDealerDetailPage;
  let fixture: ComponentFixture<EsimDealerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimDealerDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimDealerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
