import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtsComponent } from './vts.component';

describe('VtsComponent', () => {
  let component: VtsComponent;
  let fixture: ComponentFixture<VtsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
