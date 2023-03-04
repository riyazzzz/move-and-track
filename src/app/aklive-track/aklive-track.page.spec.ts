import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AkliveTrackPage } from './aklive-track.page';

describe('AkliveTrackPage', () => {
  let component: AkliveTrackPage;
  let fixture: ComponentFixture<AkliveTrackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AkliveTrackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AkliveTrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
