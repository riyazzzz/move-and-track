import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BulkExtendComponent } from './bulk-extend.component';

describe('BulkExtendComponent', () => {
  let component: BulkExtendComponent;
  let fixture: ComponentFixture<BulkExtendComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BulkExtendComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BulkExtendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
