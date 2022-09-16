import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AhorroProgramadoComponent } from './ahorro-programado.component';

describe('AhorroProgramadoComponent', () => {
  let component: AhorroProgramadoComponent;
  let fixture: ComponentFixture<AhorroProgramadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AhorroProgramadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AhorroProgramadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
