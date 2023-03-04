import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CARequestPage } from './ca-request.page';

describe('CARequestPage', () => {
  let component: CARequestPage;
  let fixture: ComponentFixture<CARequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CARequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CARequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
