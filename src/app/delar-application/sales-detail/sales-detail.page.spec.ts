import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesDetailPage } from './sales-detail.page';

describe('SalesDetailPage', () => {
  let component: SalesDetailPage;
  let fixture: ComponentFixture<SalesDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SalesDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SalesDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
