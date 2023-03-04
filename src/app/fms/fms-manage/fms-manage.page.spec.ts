import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsManagePage } from './fms-manage.page';

describe('FmsManagePage', () => {
  let component: FmsManagePage;
  let fixture: ComponentFixture<FmsManagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmsManagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsManagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
