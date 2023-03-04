import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CurrencySettingsPage } from './currency-settings.page';

describe('CurrencySettingsPage', () => {
  let component: CurrencySettingsPage;
  let fixture: ComponentFixture<CurrencySettingsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CurrencySettingsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CurrencySettingsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
