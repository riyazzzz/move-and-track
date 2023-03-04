import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimAddProductionComponent } from './esim-add-production.component';

describe('EsimAddProductionComponent', () => {
  let component: EsimAddProductionComponent;
  let fixture: ComponentFixture<EsimAddProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimAddProductionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimAddProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
