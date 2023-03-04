import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GateTablePage } from './gate-table.page';

describe('GateTablePage', () => {
  let component: GateTablePage;
  let fixture: ComponentFixture<GateTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GateTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GateTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
