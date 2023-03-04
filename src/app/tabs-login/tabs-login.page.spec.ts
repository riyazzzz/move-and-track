import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsLoginPage } from './tabs-login.page';

describe('TabsLoginPage', () => {
  let component: TabsLoginPage;
  let fixture: ComponentFixture<TabsLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
