import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConversationTabPage } from './conversation-tab.page';

describe('ConversationTabPage', () => {
  let component: ConversationTabPage;
  let fixture: ComponentFixture<ConversationTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConversationTabPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConversationTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
