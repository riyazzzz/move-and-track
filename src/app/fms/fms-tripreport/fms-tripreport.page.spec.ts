import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsTripreportPage } from './fms-tripreport.page';

describe('FmsTripreportPage', () => {
  let component: FmsTripreportPage;
  let fixture: ComponentFixture<FmsTripreportPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmsTripreportPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsTripreportPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
