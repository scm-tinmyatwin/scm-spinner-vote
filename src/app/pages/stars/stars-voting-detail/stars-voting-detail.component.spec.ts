import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsVotingDetailComponent } from './stars-voting-detail.component';

describe('StarsVotingDetailComponent', () => {
  let component: StarsVotingDetailComponent;
  let fixture: ComponentFixture<StarsVotingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsVotingDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsVotingDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
