import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditGruposComponent } from './add-edit-grupos.component';

describe('AddEditGruposComponent', () => {
  let component: AddEditGruposComponent;
  let fixture: ComponentFixture<AddEditGruposComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditGruposComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditGruposComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
