import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TempratureCardComponent } from './temprature-card.component';

describe('TempratureCardComponent', () => {
  let component: TempratureCardComponent;
  let fixture: ComponentFixture<TempratureCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TempratureCardComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TempratureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
