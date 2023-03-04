import { TestBed } from '@angular/core/testing';

import { PdfLogoService } from './pdf-logo.service';

describe('PdfLogoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdfLogoService = TestBed.get(PdfLogoService);
    expect(service).toBeTruthy();
  });
});
