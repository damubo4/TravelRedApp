import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CajaMayorComponent } from './caja-mayor.component';

describe('CajaMayorComponent', () => {
  let component: CajaMayorComponent;
  let fixture: ComponentFixture<CajaMayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CajaMayorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CajaMayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
