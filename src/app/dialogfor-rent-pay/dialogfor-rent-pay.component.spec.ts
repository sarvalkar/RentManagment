import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogforRentPayComponent } from './dialogfor-rent-pay.component';

describe('DialogforRentPayComponent', () => {
  let component: DialogforRentPayComponent;
  let fixture: ComponentFixture<DialogforRentPayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogforRentPayComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogforRentPayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
