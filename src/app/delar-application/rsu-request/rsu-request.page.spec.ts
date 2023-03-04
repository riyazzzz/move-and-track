import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RSURequestPage } from './rsu-request.page';

describe('RSURequestPage', () => {
  let component: RSURequestPage;
  let fixture: ComponentFixture<RSURequestPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RSURequestPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RSURequestPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
