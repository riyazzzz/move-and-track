import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModelStatusPage } from './model-status.page';

describe('ModelStatusPage', () => {
  let component: ModelStatusPage;
  let fixture: ComponentFixture<ModelStatusPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModelStatusPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModelStatusPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
