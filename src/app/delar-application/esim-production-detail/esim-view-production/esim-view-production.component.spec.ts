import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EsimViewProductionComponent } from './esim-view-production.component';

describe('EsimViewProductionComponent', () => {
  let component: EsimViewProductionComponent;
  let fixture: ComponentFixture<EsimViewProductionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EsimViewProductionComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EsimViewProductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
