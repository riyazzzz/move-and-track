import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassTablePage } from './class-table.page';

describe('ClassTablePage', () => {
  let component: ClassTablePage;
  let fixture: ComponentFixture<ClassTablePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassTablePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassTablePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
