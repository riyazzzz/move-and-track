import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimViewSerialDeatilsComponent } from './esim-view-serial-deatils.component';

describe('EsimViewSerialDeatilsComponent', () => {
  let component: EsimViewSerialDeatilsComponent;
  let fixture: ComponentFixture<EsimViewSerialDeatilsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimViewSerialDeatilsComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimViewSerialDeatilsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
