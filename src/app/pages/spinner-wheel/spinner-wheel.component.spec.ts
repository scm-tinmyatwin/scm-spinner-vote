import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerWheelComponent } from './spinner-wheel.component';

describe('SpinnerWheelComponent', () => {
  let component: SpinnerWheelComponent;
  let fixture: ComponentFixture<SpinnerWheelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerWheelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
