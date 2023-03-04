import { TestBed } from '@angular/core/testing';

import { WebsocketliveService } from './websocketlive.service';

describe('WebsocketliveService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: WebsocketliveService = TestBed.get(WebsocketliveService);
    expect(service).toBeTruthy();
  });
});
