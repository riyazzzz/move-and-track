import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageFleetPage } from './manage-fleet.page';

describe('ManageFleetPage', () => {
  let component: ManageFleetPage;
  let fixture: ComponentFixture<ManageFleetPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageFleetPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageFleetPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
