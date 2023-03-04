import { TestBed } from '@angular/core/testing';

import { OpenlayerMapService } from './openlayer-map.service';

describe('OpenlayerMapService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: OpenlayerMapService = TestBed.get(OpenlayerMapService);
    expect(service).toBeTruthy();
  });
});
