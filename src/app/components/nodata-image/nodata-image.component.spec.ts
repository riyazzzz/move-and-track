import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodataImageComponent } from './nodata-image.component';

describe('NodataImageComponent', () => {
  let component: NodataImageComponent;
  let fixture: ComponentFixture<NodataImageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodataImageComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodataImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
