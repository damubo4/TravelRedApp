import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEditAhorroComponent } from './add-edit-ahorro.component';

describe('AddEditAhorroComponent', () => {
  let component: AddEditAhorroComponent;
  let fixture: ComponentFixture<AddEditAhorroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEditAhorroComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEditAhorroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
