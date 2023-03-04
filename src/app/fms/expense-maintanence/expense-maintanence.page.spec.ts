import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseMaintanencePage } from './expense-maintanence.page';

describe('ExpenseMaintanencePage', () => {
  let component: ExpenseMaintanencePage;
  let fixture: ComponentFixture<ExpenseMaintanencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseMaintanencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseMaintanencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
