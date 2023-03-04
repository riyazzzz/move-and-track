import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OverspeedPage } from './overspeed.page';

describe('OverspeedPage', () => {
  let component: OverspeedPage;
  let fixture: ComponentFixture<OverspeedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OverspeedPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverspeedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
