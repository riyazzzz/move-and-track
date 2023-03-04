import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GridMovementComponent } from './grid-movement.component';

describe('GridMovementComponent', () => {
  let component: GridMovementComponent;
  let fixture: ComponentFixture<GridMovementComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GridMovementComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GridMovementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
