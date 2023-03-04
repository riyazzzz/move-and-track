import { TestBed } from '@angular/core/testing';

import { ManageFleetsService } from './manage-fleets.service';

describe('ManageFleetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ManageFleetsService = TestBed.get(ManageFleetsService);
    expect(service).toBeTruthy();
  });
});
