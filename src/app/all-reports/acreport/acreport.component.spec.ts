import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcreportComponent } from './acreport.component';

describe('AcreportComponent', () => {
  let component: AcreportComponent;
  let fixture: ComponentFixture<AcreportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcreportComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcreportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
