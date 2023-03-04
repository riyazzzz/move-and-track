import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VtsgridComponent } from './vtsgrid.component';

describe('VtsgridComponent', () => {
  let component: VtsgridComponent;
  let fixture: ComponentFixture<VtsgridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VtsgridComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VtsgridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
