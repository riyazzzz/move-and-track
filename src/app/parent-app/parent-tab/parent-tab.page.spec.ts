import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ParentTabPage } from './parent-tab.page';

describe('ParentTabPage', () => {
  let component: ParentTabPage;
  let fixture: ComponentFixture<ParentTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ParentTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ParentTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
