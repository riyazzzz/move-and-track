import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssertStatusListPage } from './assert-status-list.page';

describe('AssertStatusListPage', () => {
  let component: AssertStatusListPage;
  let fixture: ComponentFixture<AssertStatusListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssertStatusListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssertStatusListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
