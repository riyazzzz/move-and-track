import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkTopupComponent } from './bulk-topup.component';

describe('BulkTopupComponent', () => {
  let component: BulkTopupComponent;
  let fixture: ComponentFixture<BulkTopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkTopupComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkTopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
