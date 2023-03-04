import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketConversationPage } from './ticket-conversation.page';

describe('TicketConversationPage', () => {
  let component: TicketConversationPage;
  let fixture: ComponentFixture<TicketConversationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TicketConversationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketConversationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
