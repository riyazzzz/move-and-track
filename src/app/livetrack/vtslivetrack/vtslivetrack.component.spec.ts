import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtslivetrackComponent } from './vtslivetrack.component';

describe('VtslivetrackComponent', () => {
  let component: VtslivetrackComponent;
  let fixture: ComponentFixture<VtslivetrackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtslivetrackComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtslivetrackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
