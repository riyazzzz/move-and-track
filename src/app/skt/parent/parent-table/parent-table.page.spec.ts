import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentTablePage } from './parent-table.page';

describe('ParentTablePage', () => {
  let component: ParentTablePage;
  let fixture: ComponentFixture<ParentTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
