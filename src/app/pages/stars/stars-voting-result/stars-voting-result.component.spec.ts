import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsVotingResultComponent } from './stars-voting-result.component';

describe('StarsVotingResultComponent', () => {
  let component: StarsVotingResultComponent;
  let fixture: ComponentFixture<StarsVotingResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsVotingResultComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsVotingResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
