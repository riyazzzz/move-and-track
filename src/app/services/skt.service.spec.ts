import { TestBed } from '@angular/core/testing';

import { SktService } from './skt.service';

describe('SktService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SktService = TestBed.get(SktService);
    expect(service).toBeTruthy();
  });
});
