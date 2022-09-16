import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCuentaComponent } from './add-edit-cuenta.component';

describe('AddEditCuentaComponent', () => {
  let component: AddEditCuentaComponent;
  let fixture: ComponentFixture<AddEditCuentaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCuentaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCuentaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
