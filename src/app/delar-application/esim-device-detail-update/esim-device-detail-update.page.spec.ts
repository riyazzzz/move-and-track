import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimDeviceDetailUpdatePage } from './esim-device-detail-update.page';

describe('EsimDeviceDetailUpdatePage', () => {
  let component: EsimDeviceDetailUpdatePage;
  let fixture: ComponentFixture<EsimDeviceDetailUpdatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimDeviceDetailUpdatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimDeviceDetailUpdatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
