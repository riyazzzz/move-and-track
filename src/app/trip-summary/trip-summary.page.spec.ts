import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TripSummaryPage } from './trip-summary.page';

describe('TripSummaryPage', () => {
  let component: TripSummaryPage;
  let fixture: ComponentFixture<TripSummaryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TripSummaryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TripSummaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
