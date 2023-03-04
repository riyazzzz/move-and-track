import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEsimRenewalStatusUpdateComponent } from './add-esim-renewal-status-update.component';

describe('AddEsimRenewalStatusUpdateComponent', () => {
  let component: AddEsimRenewalStatusUpdateComponent;
  let fixture: ComponentFixture<AddEsimRenewalStatusUpdateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEsimRenewalStatusUpdateComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEsimRenewalStatusUpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
