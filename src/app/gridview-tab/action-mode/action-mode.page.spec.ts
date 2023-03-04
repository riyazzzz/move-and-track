import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ActionModePage } from './action-mode.page';

describe('ActionModePage', () => {
  let component: ActionModePage;
  let fixture: ComponentFixture<ActionModePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ActionModePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ActionModePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
