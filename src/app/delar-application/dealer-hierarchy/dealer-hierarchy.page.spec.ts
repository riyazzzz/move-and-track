import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerHierarchyPage } from './dealer-hierarchy.page';

describe('DealerHierarchyPage', () => {
  let component: DealerHierarchyPage;
  let fixture: ComponentFixture<DealerHierarchyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerHierarchyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerHierarchyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
