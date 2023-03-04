import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LivetrackPage } from './livetrack.page';

describe('LivetrackPage', () => {
  let component: LivetrackPage;
  let fixture: ComponentFixture<LivetrackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LivetrackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LivetrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
