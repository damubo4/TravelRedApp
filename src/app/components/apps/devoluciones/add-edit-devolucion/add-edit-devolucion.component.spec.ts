import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditDevolucionComponent } from './add-edit-devolucion.component';

describe('AddEditDevolucionComponent', () => {
  let component: AddEditDevolucionComponent;
  let fixture: ComponentFixture<AddEditDevolucionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditDevolucionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditDevolucionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
