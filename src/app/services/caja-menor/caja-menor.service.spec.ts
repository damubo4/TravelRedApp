import { TestBed } from '@angular/core/testing';

import { CajaMenorService } from './caja-menor.service';

describe('CajaMenorService', () => {
  let service: CajaMenorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaMenorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
