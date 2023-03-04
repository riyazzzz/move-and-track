import { TestBed } from '@angular/core/testing';

import { SearchManageFleetsService } from './search-manage-fleets.service';

describe('SearchManageFleetsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchManageFleetsService = TestBed.get(SearchManageFleetsService);
    expect(service).toBeTruthy();
  });
});
