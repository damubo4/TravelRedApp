import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditTourComponent } from './add-edit-tour.component';

describe('AddEditTourComponent', () => {
  let component: AddEditTourComponent;
  let fixture: ComponentFixture<AddEditTourComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditTourComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditTourComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
