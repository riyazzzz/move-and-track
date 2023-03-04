import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsreportsFormPage } from './fmsreports-form.page';

describe('FmsreportsFormPage', () => {
  let component: FmsreportsFormPage;
  let fixture: ComponentFixture<FmsreportsFormPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmsreportsFormPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsreportsFormPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
