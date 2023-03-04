import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteTripPage } from './route-trip.page';

describe('RouteTripPage', () => {
  let component: RouteTripPage;
  let fixture: ComponentFixture<RouteTripPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteTripPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteTripPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
