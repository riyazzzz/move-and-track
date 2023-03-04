import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridviewTabPage } from './gridview-tab.page';

describe('GridviewTabPage', () => {
  let component: GridviewTabPage;
  let fixture: ComponentFixture<GridviewTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridviewTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridviewTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
