import { TestBed } from '@angular/core/testing';

import { AuthMapService } from './auth-map.service';

describe('AuthMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AuthMapService = TestBed.get(AuthMapService);
    expect(service).toBeTruthy();
  });
});
