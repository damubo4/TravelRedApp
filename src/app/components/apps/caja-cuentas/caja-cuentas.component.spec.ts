import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaCuentasComponent } from './caja-cuentas.component';

describe('CajaCuentasComponent', () => {
  let component: CajaCuentasComponent;
  let fixture: ComponentFixture<CajaCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
