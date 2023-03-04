import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempraturePage } from './temprature.page';

describe('TempraturePage', () => {
  let component: TempraturePage;
  let fixture: ComponentFixture<TempraturePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempraturePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempraturePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
