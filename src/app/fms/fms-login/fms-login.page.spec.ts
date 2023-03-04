import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FmsLoginPage } from './fms-login.page';

describe('FmsLoginPage', () => {
  let component: FmsLoginPage;
  let fixture: ComponentFixture<FmsLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FmsLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FmsLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
