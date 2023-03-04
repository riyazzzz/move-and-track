import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerStockListPage } from './dealer-stock-list.page';

describe('DealerStockListPage', () => {
  let component: DealerStockListPage;
  let fixture: ComponentFixture<DealerStockListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerStockListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerStockListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
