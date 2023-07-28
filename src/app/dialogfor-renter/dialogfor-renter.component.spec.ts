import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogforRenterComponent } from './dialogfor-renter.component';

describe('DialogforRenterComponent', () => {
  let component: DialogforRenterComponent;
  let fixture: ComponentFixture<DialogforRenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogforRenterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogforRenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
