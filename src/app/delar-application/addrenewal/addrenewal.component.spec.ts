import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddrenewalComponent } from './addrenewal.component';

describe('AddrenewalComponent', () => {
  let component: AddrenewalComponent;
  let fixture: ComponentFixture<AddrenewalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddrenewalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddrenewalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
