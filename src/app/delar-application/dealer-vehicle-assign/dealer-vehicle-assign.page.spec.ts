import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerVehicleAssignPage } from './dealer-vehicle-assign.page';

describe('DealerVehicleAssignPage', () => {
  let component: DealerVehicleAssignPage;
  let fixture: ComponentFixture<DealerVehicleAssignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerVehicleAssignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerVehicleAssignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
