import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SenoriseRSUPage } from './senorise-rsu.page';

describe('SenoriseRSUPage', () => {
  let component: SenoriseRSUPage;
  let fixture: ComponentFixture<SenoriseRSUPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SenoriseRSUPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SenoriseRSUPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
