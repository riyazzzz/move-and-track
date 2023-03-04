import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatLongMapPickerPage } from './lat-long-map-picker.page';

describe('LatLongMapPickerPage', () => {
  let component: LatLongMapPickerPage;
  let fixture: ComponentFixture<LatLongMapPickerPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatLongMapPickerPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatLongMapPickerPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
