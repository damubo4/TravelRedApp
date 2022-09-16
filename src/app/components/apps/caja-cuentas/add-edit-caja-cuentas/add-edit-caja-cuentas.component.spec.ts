import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCajaCuentasComponent } from './add-edit-caja-cuentas.component';

describe('AddEditCajaCuentasComponent', () => {
  let component: AddEditCajaCuentasComponent;
  let fixture: ComponentFixture<AddEditCajaCuentasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCajaCuentasComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCajaCuentasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
