import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimHomePage } from './esim-home.page';

describe('EsimHomePage', () => {
  let component: EsimHomePage;
  let fixture: ComponentFixture<EsimHomePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimHomePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimHomePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
