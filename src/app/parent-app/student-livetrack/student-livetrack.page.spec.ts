import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentLivetrackPage } from './student-livetrack.page';

describe('StudentLivetrackPage', () => {
  let component: StudentLivetrackPage;
  let fixture: ComponentFixture<StudentLivetrackPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentLivetrackPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentLivetrackPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
