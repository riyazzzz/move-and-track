import { TestBed } from '@angular/core/testing';

import { StockFilterService } from './stock-filter.service';

describe('StockFilterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: StockFilterService = TestBed.get(StockFilterService);
    expect(service).toBeTruthy();
  });
});
