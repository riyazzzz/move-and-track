import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TableOverspeedComponent } from './table-overspeed.component';

describe('TableOverspeedComponent', () => {
  let component: TableOverspeedComponent;
  let fixture: ComponentFixture<TableOverspeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TableOverspeedComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TableOverspeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
