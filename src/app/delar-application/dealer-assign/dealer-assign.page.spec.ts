import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerAssignPage } from './dealer-assign.page';

describe('DealerAssignPage', () => {
  let component: DealerAssignPage;
  let fixture: ComponentFixture<DealerAssignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerAssignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerAssignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
