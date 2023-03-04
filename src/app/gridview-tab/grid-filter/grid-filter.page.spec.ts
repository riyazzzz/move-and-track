import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridFilterPage } from './grid-filter.page';

describe('GridFilterPage', () => {
  let component: GridFilterPage;
  let fixture: ComponentFixture<GridFilterPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridFilterPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridFilterPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
