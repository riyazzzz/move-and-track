import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCameraPage } from './add-camera.page';

describe('AddCameraPage', () => {
  let component: AddCameraPage;
  let fixture: ComponentFixture<AddCameraPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddCameraPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCameraPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
