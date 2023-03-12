import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EndUserCreationComponent } from './end-user-creation.component';

describe('EndUserCreationComponent', () => {
  let component: EndUserCreationComponent;
  let fixture: ComponentFixture<EndUserCreationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EndUserCreationComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EndUserCreationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
