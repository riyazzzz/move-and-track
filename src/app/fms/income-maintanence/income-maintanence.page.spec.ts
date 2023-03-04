import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeMaintanencePage } from './income-maintanence.page';

describe('IncomeMaintanencePage', () => {
  let component: IncomeMaintanencePage;
  let fixture: ComponentFixture<IncomeMaintanencePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IncomeMaintanencePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeMaintanencePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
