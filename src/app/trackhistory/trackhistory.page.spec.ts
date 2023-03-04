import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrackhistoryPage } from './trackhistory.page';

describe('TrackhistoryPage', () => {
  let component: TrackhistoryPage;
  let fixture: ComponentFixture<TrackhistoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrackhistoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrackhistoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
