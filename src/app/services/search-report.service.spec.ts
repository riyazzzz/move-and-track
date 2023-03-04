import { TestBed } from '@angular/core/testing';

import { SearchReportService } from './search-report.service';

describe('SearchReportService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SearchReportService = TestBed.get(SearchReportService);
    expect(service).toBeTruthy();
  });
});
