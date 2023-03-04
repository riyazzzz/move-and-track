import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BroadcastSmsPage } from './broadcast-sms.page';

describe('BroadcastSmsPage', () => {
  let component: BroadcastSmsPage;
  let fixture: ComponentFixture<BroadcastSmsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BroadcastSmsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BroadcastSmsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
