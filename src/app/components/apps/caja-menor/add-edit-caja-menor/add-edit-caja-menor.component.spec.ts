import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditCajaMenorComponent } from './add-edit-caja-menor.component';

describe('AddEditCajaMenorComponent', () => {
  let component: AddEditCajaMenorComponent;
  let fixture: ComponentFixture<AddEditCajaMenorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditCajaMenorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditCajaMenorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
