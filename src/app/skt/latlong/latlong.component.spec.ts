import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LatlongComponent } from './latlong.component';

describe('LatlongComponent', () => {
  let component: LatlongComponent;
  let fixture: ComponentFixture<LatlongComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LatlongComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LatlongComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
