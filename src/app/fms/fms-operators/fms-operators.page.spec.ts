import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsOperatorsPage } from './fms-operators.page';

describe('FmsOperatorsPage', () => {
  let component: FmsOperatorsPage;
  let fixture: ComponentFixture<FmsOperatorsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmsOperatorsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsOperatorsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
