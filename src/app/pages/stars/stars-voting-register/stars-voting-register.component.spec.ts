import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsVotingRegisterComponent } from './stars-voting-register.component';

describe('StarsVotingRegisterComponent', () => {
  let component: StarsVotingRegisterComponent;
  let fixture: ComponentFixture<StarsVotingRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsVotingRegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsVotingRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
