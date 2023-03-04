import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridSortComponent } from './grid-sort.component';

describe('GridSortComponent', () => {
  let component: GridSortComponent;
  let fixture: ComponentFixture<GridSortComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridSortComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridSortComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
