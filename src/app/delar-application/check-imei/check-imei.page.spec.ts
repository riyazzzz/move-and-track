import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CheckImeiPage } from './check-imei.page';

describe('CheckImeiPage', () => {
  let component: CheckImeiPage;
  let fixture: ComponentFixture<CheckImeiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CheckImeiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CheckImeiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
