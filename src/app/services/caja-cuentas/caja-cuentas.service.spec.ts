import { TestBed } from '@angular/core/testing';
import { CajaCuentasService } from './caja-cuentas.service';

describe('CajaCuentasService', () => {
  let service: CajaCuentasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CajaCuentasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
