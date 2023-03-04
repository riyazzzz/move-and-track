import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchoolEnablePage } from './school-enable.page';

describe('SchoolEnablePage', () => {
  let component: SchoolEnablePage;
  let fixture: ComponentFixture<SchoolEnablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchoolEnablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchoolEnablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
