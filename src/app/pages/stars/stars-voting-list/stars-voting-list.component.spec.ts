import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StarsVotingListComponent } from './stars-voting-list.component';

describe('StarsVotingListComponent', () => {
  let component: StarsVotingListComponent;
  let fixture: ComponentFixture<StarsVotingListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StarsVotingListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StarsVotingListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
