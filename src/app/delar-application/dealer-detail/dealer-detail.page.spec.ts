import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerDetailPage } from './dealer-detail.page';

describe('DealerDetailPage', () => {
  let component: DealerDetailPage;
  let fixture: ComponentFixture<DealerDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DealerDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DealerDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
