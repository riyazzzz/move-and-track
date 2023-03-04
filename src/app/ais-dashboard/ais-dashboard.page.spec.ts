import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AisDashboardPage } from './ais-dashboard.page';

describe('AisDashboardPage', () => {
  let component: AisDashboardPage;
  let fixture: ComponentFixture<AisDashboardPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AisDashboardPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AisDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
