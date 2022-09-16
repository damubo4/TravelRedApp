import { TestBed } from '@angular/core/testing';

import { CajaMayorService } from './caja-mayor.service';

describe('CajaMayorService', () => {
  let service: CajaMayorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaMayorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
