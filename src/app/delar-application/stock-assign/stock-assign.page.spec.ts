import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockAssignPage } from './stock-assign.page';

describe('StockAssignPage', () => {
  let component: StockAssignPage;
  let fixture: ComponentFixture<StockAssignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockAssignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockAssignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
