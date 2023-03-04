import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SktExcellPage } from './skt-excell.page';

describe('SktExcellPage', () => {
  let component: SktExcellPage;
  let fixture: ComponentFixture<SktExcellPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SktExcellPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SktExcellPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
