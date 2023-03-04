import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoorOpenCountComponent } from './door-open-count.component';

describe('DoorOpenCountComponent', () => {
  let component: DoorOpenCountComponent;
  let fixture: ComponentFixture<DoorOpenCountComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoorOpenCountComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoorOpenCountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
