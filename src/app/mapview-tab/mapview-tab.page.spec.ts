import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapviewTabPage } from './mapview-tab.page';

describe('MapviewTabPage', () => {
  let component: MapviewTabPage;
  let fixture: ComponentFixture<MapviewTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapviewTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapviewTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
