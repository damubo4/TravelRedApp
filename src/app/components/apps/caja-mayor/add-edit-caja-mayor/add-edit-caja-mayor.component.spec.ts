import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCajaMayorComponent } from './add-edit-caja-mayor.component';

describe('AddEditCajaMayorComponent', () => {
  let component: AddEditCajaMayorComponent;
  let fixture: ComponentFixture<AddEditCajaMayorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCajaMayorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCajaMayorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
