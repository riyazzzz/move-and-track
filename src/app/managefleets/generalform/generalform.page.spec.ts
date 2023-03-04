import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GeneralformPage } from './generalform.page';

describe('GeneralformPage', () => {
  let component: GeneralformPage;
  let fixture: ComponentFixture<GeneralformPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeneralformPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeneralformPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
