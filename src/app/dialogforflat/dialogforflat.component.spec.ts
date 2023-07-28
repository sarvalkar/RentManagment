import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogforflatComponent } from './dialogforflat.component';

describe('DialogforflatComponent', () => {
  let component: DialogforflatComponent;
  let fixture: ComponentFixture<DialogforflatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogforflatComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogforflatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
