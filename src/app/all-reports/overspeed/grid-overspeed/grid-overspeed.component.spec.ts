import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridOverspeedComponent } from './grid-overspeed.component';

describe('GridOverspeedComponent', () => {
  let component: GridOverspeedComponent;
  let fixture: ComponentFixture<GridOverspeedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridOverspeedComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridOverspeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
